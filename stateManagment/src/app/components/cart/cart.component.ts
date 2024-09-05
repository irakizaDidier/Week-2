import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart$: Observable<CartItem[]> | undefined;
  totalItems$: Observable<number> | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.totalItems$ = this.cartService.getTotalItems();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
