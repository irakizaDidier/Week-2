import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  addToCart(item: CartItem): void {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = [...currentCart, item];
    this.cartSubject.next(updatedCart);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter(
      (item) => item.productId !== productId
    );
    this.cartSubject.next(updatedCart);
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }

  getTotalItems(): Observable<number> {
    return this.cart$.pipe(
      map((cart) => cart.reduce((total, item) => total + item.quantity, 0))
    );
  }
}
