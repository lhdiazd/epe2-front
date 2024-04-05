import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [LoginService],
  imports: [HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loggedInSubscription: Subscription | undefined;

  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      () => {
        console.log("Inicio de sesión exitoso");
        // Esperar a que se complete la actualización de loggedIn
        this.loginService.setLoggedIn(true)
        this.router.navigate(["/home"]);

      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
        this.loginService.setLoggedIn(false);
      }
    );
  }
}
