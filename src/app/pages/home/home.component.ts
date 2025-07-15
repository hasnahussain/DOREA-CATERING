import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { map, startWith } from 'rxjs/operators';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]> = new Observable<Product[]>();
  cartProductIds: number[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.filteredProducts$.pipe(
      map(products => products || []),
      startWith([])
    );

    this.cartService.getCart().subscribe((items: CartItem[]) => {
      this.cartProductIds = items.map(i => +i.product.id); 
    });
  }

  onProductAddedToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  onProductRemovedFromCart(productId: number): void {
    this.cartService.removeFromCart(productId); 
  }
}
