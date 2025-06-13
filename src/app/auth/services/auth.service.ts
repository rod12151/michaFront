import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  login(username: string, password: string) {
    return this.http.post(environment.loginUrl, { username, password })
      .pipe(map(data => {
        this.setSession(data);
        return data;
      }))
  }


  setSession(data: any) {
    const expiresAt = moment().add(data.expiresIn, 'seconds');

    localStorage.setItem('user_id', data.userId);
    localStorage.setItem('name', data.name);
    localStorage.setItem('role', data.role);
    localStorage.setItem('token', data.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isAdmin() {
    return this.getRole() == 'ADMIN';
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');

    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getName() {
    return localStorage.getItem('name') || '';
  }

  logout() {
    localStorage.clear();
  }

}
