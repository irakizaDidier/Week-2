import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
  catchError,
} from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  users: { name: string; details: string; post?: string }[] = [];
  searchResults: { name: string; details: string; post?: string }[] = [];
  loading: boolean = false;
  error: string = '';
  noResults: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.loading = true;
    this.searchService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.searchResults = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  onSearch(event: any) {
    const inputElement = event.target;
    const searchTerm = inputElement.value.trim();
    this.error = '';
    this.noResults = false;

    if (searchTerm === '') {
      this.searchResults = this.users;
      this.loading = false;
      return;
    }

    const term$ = fromEvent(inputElement, 'keyup').pipe(
      map((e: any) => e.target.value.trim())
    );

    term$
      .pipe(
        debounceTime(300),
        filter((term) => term.length >= 3 || term.length === 0),
        tap((term) => {
          if (term.length >= 3) {
            this.loading = true;
          } else {
            this.loading = false;
          }
        }),
        switchMap((term) =>
          this.searchService.searchWithPosts(of(term)).pipe(
            map((results) => {
              this.noResults = results.length === 0;
              return results;
            }),
            catchError((err) => {
              this.error = 'Search failed';
              return of([]);
            }),
            tap(() => (this.loading = false))
          )
        )
      )
      .subscribe({
        next: (results) => (this.searchResults = results),
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        },
      });
  }
}
