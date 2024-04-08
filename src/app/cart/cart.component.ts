import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../services/purchase.service';
import { Router } from '@angular/router';
import { Purchase } from '../interfaces/purchase';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
  cartItems: Product[] = [];

  total: number = 0;

  purchase: Purchase = {};
  
  showPurchaseMessage: boolean = false;

  constructor(private cartService: CartService, private purchaseService: PurchaseService, private router: Router) { }

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotal();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  calculateTotal(){
    
    for (const item of this.cartItems) {
      if (item.price !== undefined) {
        this.total += item.price;
      }
    }
  
  }

  confirmPurchase(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No se encontró el userId en el localStorage.');
      return;
    }
  
    this.purchaseService.savePurchase(+userId, this.cartItems)
      .subscribe(
        (savedPurchase) => {
          console.log(savedPurchase);
          this.clearCart();
          this.purchase = savedPurchase;
          this.purchase.total = this.total;
          this.showPurchaseMessage = true;
        },
        (error) => {
          console.error('Error al realizar la compra. Por favor, inténtalo de nuevo.', error);
        }
      );
  }

  closeAlertPurchase(){
    this.showPurchaseMessage = false;
  }

}
