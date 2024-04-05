import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080';

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkLoggedInState();
  }

  private checkLoggedInState() {
    if (typeof localStorage !== 'undefined') {
      const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
      this.loggedIn.next(storedLoggedIn);
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  setLoggedIn(value: boolean) {    
    this.loggedIn.next(value);    
    localStorage.setItem('loggedIn', value.toString());
  }

  login(username: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/login`, { username, password });
  }

  getLoggedInObservable(): Observable<boolean> {
    this.checkLoggedInState();
    return this.loggedIn.asObservable();
  }
}