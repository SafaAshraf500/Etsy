import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInKey = 'isLoggedIn';

  login() {
    localStorage.setItem(this.loggedInKey, 'true');
  }

  logout() {
    localStorage.removeItem(this.loggedInKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }
}
