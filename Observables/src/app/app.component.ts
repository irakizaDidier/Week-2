import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}

  numbers$: Observable<number[]> | undefined;

  ngOnInit(): void {
    this.subscribeToNumbers();
    this.subscribeToColors();
    this.subscribeToIntervalNumbers();
    this.subscribeToCombinedObservable();
    this.subscribeToErrorObservable();
    this.numbers$ = this.dataService.getNumbersAsync();
  }

  // Task 1 Subscription
  subscribeToNumbers(): void {
    this.dataService.getNumbers().subscribe({
      next: (value) => console.log(`Service of() emitted: ${value}`),
      complete: () => console.log('Service of() observable completed!'),
    });
  }

  // Task 2 Subscription
  subscribeToColors(): void {
    this.dataService.getColors().subscribe({
      next: (color) => console.log(`Service from() emitted: ${color}`),
      complete: () => console.log('Service from() observable completed!'),
    });
  }

  // Task 3 Subscription
  subscribeToIntervalNumbers(): void {
    this.dataService.getIntervalNumbers().subscribe({
      next: (value) =>
        console.log(
          `Service interval() emitted: ${value} at ${new Date().toLocaleTimeString()}`
        ),
      complete: () => console.log('Service interval() observable completed!'),
    });
  }

  // Task 4 Subscription
  subscribeToCombinedObservable(): void {
    this.dataService.getCombinedObservable().subscribe({
      next: (value) => console.log(`Service concat() emitted: ${value}`),
      complete: () => console.log('Service concat() observable completed!'),
    });
  }

  // Task 5 Subscription
  subscribeToErrorObservable(): void {
    this.dataService.getErrorObservable().subscribe({
      next: (value) =>
        console.log(`Service Error Observable emitted: ${value}`),
      error: (err) => console.error(`Service Error Observable error: ${err}`),
      complete: () => console.log('Service Error Observable completed!'),
    });
  }
}
