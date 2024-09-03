import { Injectable } from '@angular/core';
import { of, combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  map,
  catchError,
  finalize,
  switchMap,
  filter,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  simulateUserDetailsApi(): Observable<any> {
    return of({ name: 'Irakiza Didier' }).pipe(debounceTime(500));
  }

  simulateUserPostsApi(): Observable<any[]> {
    return of([{ title: 'Post 1' }, { title: 'Post 2' }]).pipe(
      debounceTime(1000)
    );
  }

  combineUserDetailsAndPosts(): Observable<any> {
    return combineLatest([
      this.simulateUserDetailsApi(),
      this.simulateUserPostsApi(),
    ]).pipe(
      map(([details, posts]) => ({ ...details, posts })),
      catchError((err) => {
        throw new Error('Data Combination Error');
      })
    );
  }

  search(term$: Observable<string>): Observable<string> {
    return term$.pipe(
      debounceTime(300),
      filter((term) => term.length >= 3),
      switchMap((term) => {
        return of(`Result for ${term}`).pipe(
          catchError((err) => {
            throw new Error('Search Error');
          })
        );
      })
    );
  }
}
