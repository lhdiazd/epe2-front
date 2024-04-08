import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Product[] = [];
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.loadCartState();
  }

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.saveCartState();
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  getCartItemCount(): number {
    return this.cartItems.length;
  }

  private saveCartState(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCartState();
  }

  private loadCartState(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  getCartItemsObservable(): BehaviorSubject<Product[]> {
    return this.cartItemsSubject;
  }
}
