import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../model/product.model';

export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.getValue();
    const existingCartItem = currentCart.find(
      (item) => item.productId === product.id
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      const newCartItem: CartItem = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        image: product.image,
      };
      currentCart.push(newCartItem);
    }
    this.cartSubject.next([...currentCart]);
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
  getTotalPrice(): Observable<number> {
    return this.cart$.pipe(
      map((cart) =>
        cart.reduce((total, item) => total + item.quantity * item.price, 0)
      )
    );
  }
}
