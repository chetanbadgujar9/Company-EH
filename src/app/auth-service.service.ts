import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthServiceService {

  constructor(private _router: Router) {

  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn() {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  }
  logOut() {
    localStorage.clear();
    this._router.navigate(['login']);
  }
}
