import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, LoginComponent, NavbarComponent, HttpClientModule]
})
export class AppComponent {
  title = 'epe2-front';

  hideNavbar: boolean;

  constructor(private router: Router) {
    this.hideNavbar = false;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideNavbar = event.url === '/login' || event.url === '/';
      }
    });
  }
}
