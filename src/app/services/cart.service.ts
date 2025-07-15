import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.cartItemsSubject.next([...currentItems]);
    this.updateCartCount();
    this.saveCartToStorage();
  }

  // removeFromCart(productId: string): void {
  //   const updatedItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
  //   this.cartItemsSubject.next(updatedItems);
  //   this.updateCartCount();
  //   this.saveCartToStorage();
  // }
  removeFromCart(productId: number): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
    this.updateCartCount();
    this.saveCartToStorage();
  }

  // updateQuantity(productId: string, quantity: number): void {
  //   const currentItems = this.cartItemsSubject.value;
  //   const item = currentItems.find(item => item.product.id === productId);

  //   if (item) {
  //     if (quantity <= 0) {
  //       this.removeFromCart(productId);
  //     } else {
  //       item.quantity = quantity;
  //       this.cartItemsSubject.next([...currentItems]);
  //       this.updateCartCount();
  //       this.saveCartToStorage();
  //     }
  //   }
  // }
  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => item.product.id === productId);
  
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.cartItemsSubject.next([...currentItems]);
        this.updateCartCount();
        this.saveCartToStorage();
      }
    }
  }
  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.updateCartCount();
    this.saveCartToStorage();
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  private updateCartCount(): void {
    const totalCount = this.cartItemsSubject.value.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(totalCount);
  }

  private saveCartToStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.value));
    }
  }

  private loadCartFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        this.cartItemsSubject.next(cartItems);
        this.updateCartCount();
      }
    }
  }

  getCart(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }
}
