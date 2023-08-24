import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signIn(email: string | undefined | null, password: string | undefined | null) {
    return this.httpClient.post('auth/login', { email, password });
  }
}
