import { Injectable } from '@angular/core';
import { of, from, interval, concat, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Task 1: Using 'of'
  getNumbers(): Observable<number> {
    return of(1, 2, 3, 4, 5);
  }

  // Task 2: Using 'from'
  getColors(): Observable<string> {
    const colors = ['Red', 'Green', 'Blue', 'Yellow'];
    return from(colors);
  }

  // Task 3: Using 'interval' with 'take'
  getIntervalNumbers(): Observable<number> {
    return interval(1000).pipe(take(5));
  }

  // Task 4: Combining Observables with 'concat'
  getCombinedObservable(): Observable<any> {
    const numberObservable = of(1, 2, 3);
    const colorObservable = from(['Red', 'Green', 'Blue']);
    return concat(numberObservable, colorObservable);
  }

  // Task 5: Error Handling
  getErrorObservable(): Observable<number> {
    return new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.error('An unexpected error occurred!');
      observer.next(3);
      observer.complete();
    });
  }

  // Example of Using Async Pipe
  getNumbersAsync(): Observable<number[]> {
    return of([1, 2, 3, 4, 5]);
  }
}
