import { Component, OnInit } from '@angular/core';
import { fromEvent, map } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResults: string | undefined;
  combinedData: any;
  loading: boolean = false;
  error: string = '';

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.loading = true;
    this.searchService.combineUserDetailsAndPosts().subscribe({
      next: (combinedData) => (this.combinedData = combinedData),
      error: (err) => (this.error = err.message),
      complete: () => (this.loading = false),
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    this.error = '';

    if (searchTerm.length >= 3) {
      this.loading = true;

      const term$ = fromEvent(event.target, 'keyup').pipe(
        map((e: any) => e.target.value)
      );

      this.searchService.search(term$).subscribe({
        next: (result) => (this.searchResults = result),
        error: (err) => (this.error = err.message),
        complete: () => (this.loading = false),
      });
    }
  }
}
