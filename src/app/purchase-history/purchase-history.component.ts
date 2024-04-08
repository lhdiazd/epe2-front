import { Component } from '@angular/core';
import { Purchase } from '../interfaces/purchase';
import { PurchaseService } from '../services/purchase.service';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent {
  purchases: Purchase[] = [];

  constructor(private purchaseService: PurchaseService, private loginService: LoginService) { }

  ngOnInit(): void {
    // Llamada al método del servicio para obtener las compras por ID de usuario
    this.getPurchaseByUserId();
  }

  getPurchaseByUserId(): void {
    if (typeof localStorage !== 'undefined') {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const userIdNumber = parseInt(userId, 10);
        this.purchaseService.getPurchaseByUserId(userIdNumber).subscribe(
          (purchases) => {
            this.purchases = purchases;
            console.log(purchases);
          },
          (error) => {
            console.error('Error al obtener las compras:', error);
          }
        );
      } else {
        console.error('User ID not available');
      }
    } else {
      console.error('localStorage is not available');
    }
  }

  calculateTotal(purchase: Purchase): number {
    let total = 0;
    // Verificar si purchase y purchase.items no son nulos o undefined
    if (purchase && purchase.items) {
      // Iterar sobre los items de la compra
      for (const item of purchase.items) {
        // Verificar si item y item.product no son nulos o undefined
        if (item && item.product && item.product.price) {
          // Sumar el precio del producto multiplicado por la cantidad
          total += item.product.price;
        }
      }
    }
    return total;
  }

}
