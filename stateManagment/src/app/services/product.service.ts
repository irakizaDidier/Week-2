import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
