import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080';

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private username: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.clearAuthInfo();
    this.checkLoggedInState();
  }


  private clearAuthInfo() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    }
    this.loggedIn.next(false);
    this.userId.next(null);
    this.username.next(null);
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

  getUserId(): Observable<number | null> {
    return this.userId.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.username.asObservable();
  }

  saveUserInfo(userId: number, username: string): void {
    this.userId.next(userId);
    this.username.next(username);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('username', username);
  }

}