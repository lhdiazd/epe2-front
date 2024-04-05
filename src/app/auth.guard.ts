import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.loginService.getLoggedInObservable().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          console.log("Estás autenticado. Permitiendo el acceso.");
          return true;
        } else {
          console.log("No estás autenticado. Redirigiendo al inicio de sesión.");
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }    
}