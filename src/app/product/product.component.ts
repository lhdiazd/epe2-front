import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: Product[] = [];
  showMessage: boolean = false;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();
    
  }

  loadProducts(): void {
    this.productService.getAllProducts()
      .subscribe(products => {
        this.products = products;
        console.log(this.products); 
      });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.showMessage = true; 
    setTimeout(() => {
      this.showMessage = false; 
    }, 2000);
  }
}
