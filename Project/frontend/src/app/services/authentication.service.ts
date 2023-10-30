import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

interface User {
  id?: string;
  name?: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authenticationToken!: string | null;
  user!: User | null;

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  registerUser(user: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post<{ success: boolean; message: string }>(
        'http://localhost:3000/users/register',
        user,
        {
          headers,
        }
      )
      .pipe(map((response) => response));
  }

  authenticateUser(user: { username: string; password: string }) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post<{
        success: boolean;
        message?: string;
        token?: string;
        user?: User;
      }>('http://localhost:3000/users/authenticate', user, {
        headers,
      })
      .pipe(map((response) => response));
  }

  storeUserData(
    token: string,
    user: { id?: string; name?: string; username: string; email: string }
  ) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authenticationToken = token;
    this.user = user;
  }

  logout() {
    this.authenticationToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append(
      'Authorization',
      this.authenticationToken ? this.authenticationToken : ''
    );
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient
      .get<{ user: User }>('http://localhost:3000/users/profile', {
        headers,
      })
      .pipe(map((response) => response));
  }

  loggedIn() {
    return !this.jwtHelperService.isTokenExpired(
      localStorage.getItem('id_token')
    );
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authenticationToken = token;
  }
}
