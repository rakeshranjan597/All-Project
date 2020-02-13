import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user;
  twfUrl = 'http://localhost:8080';
  // twfUrl = 'http://192.168.43.85:8080';
  isUser = false;
  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  isUserLoggedIn() {
    if (this.isUser) {
      return true;
    }
    return false;
  }

  // getAllUsers() {
  //   return this.http.get(`${this.twfUrl}/get-all-users/${this.user.email}`);
  // }
}
