import { Injectable } from '@angular/core';
import { of, Observable, throwError, combineLatest } from 'rxjs';
import {
  debounceTime,
  map,
  catchError,
  delay,
  filter,
  retry,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private mockData = [
    { name: 'Irakiza Didier', details: 'Details about Irakiza Didier' },
    { name: 'Irakiza John', details: 'Details about Irakiza John' },
    { name: 'Didier Smith', details: 'Details about Didier Smith' },
  ];

  private userPosts = [
    { name: 'Irakiza Didier', post: 'Post about Angular' },
    { name: 'Irakiza John', post: 'Post about RxJS' },
    { name: 'Didier Smith', post: 'Post about TypeScript' },
  ];

  constructor() {}

  private simulateHttpRequest(): Observable<any> {
    const randomSuccess = Math.random() > 0.3; // 70% success rate
    return of(this.mockData).pipe(
      delay(1000),
      tap(() => console.log('HTTP request initiated')),
      map(() => {
        if (!randomSuccess) {
          throw new Error('Random simulated error');
        }
        return this.mockData;
      }),
      retry(2), // Retry twice before failing
      catchError((error) => {
        console.error('HTTP request failed after retries', error);
        return throwError(() => new Error('Failed after retries'));
      }),
      tap(() => console.log('HTTP request completed'))
    );
  }

  getAllUsers(): Observable<{ name: string; details: string }[]> {
    return this.simulateHttpRequest();
  }

  getUserPosts(): Observable<{ name: string; post: string }[]> {
    return of(this.userPosts).pipe(
      delay(500),
      catchError(() => {
        throw new Error('Error loading posts');
      })
    );
  }

  search(
    term$: Observable<string>
  ): Observable<{ name: string; details: string }[]> {
    return term$.pipe(
      debounceTime(300),
      filter((term) => term.length >= 3),
      map((term) =>
        this.mockData.filter((user) =>
          user.name.toLowerCase().includes(term.toLowerCase())
        )
      ),
      catchError(() => {
        throw new Error('Search Error');
      })
    );
  }

  searchWithPosts(
    term$: Observable<string>
  ): Observable<{ name: string; details: string; post: string }[]> {
    const searchResults$ = this.search(term$);
    const userPosts$ = this.getUserPosts();

    return combineLatest([searchResults$, userPosts$]).pipe(
      map(([searchResults, posts]) => {
        return searchResults.map((user) => {
          const userPost = posts.find((post) => post.name === user.name);
          return { ...user, post: userPost?.post || 'No post available' };
        });
      }),
      catchError(() => {
        throw new Error('Error combining data');
      })
    );
  }
}
