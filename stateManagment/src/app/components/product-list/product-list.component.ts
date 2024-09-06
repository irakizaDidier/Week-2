import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  addToCart(product: any) {
    this.cartService.addToCart({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: product.price,
    });
  }
  transform(value: string, limit: number): string {
    if (!value) return '';
    const words = value.split(' ');
    return words.length > limit
      ? words.slice(0, limit).join(' ') + '...'
      : value;
  }
}
