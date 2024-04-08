import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItemsObservable().subscribe(cartItems => {
      this.cartItemCount = cartItems.length;
    });
  }
}
