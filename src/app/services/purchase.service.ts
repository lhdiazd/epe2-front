import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { Purchase } from '../interfaces/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'http://localhost:8080/api/purchases';

  constructor(private http: HttpClient) { }

  savePurchase(userId: number, products: Product[]): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.apiUrl}/save?userId=${userId}`, products);
  }

  getPurchaseByUserId(userId: number): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}/history/${userId}`);
  }
}
