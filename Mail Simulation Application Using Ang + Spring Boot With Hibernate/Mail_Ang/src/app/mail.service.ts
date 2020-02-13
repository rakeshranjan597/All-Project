import { Injectable, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService implements DoCheck {
  userBean;

  isUser = true;
  ngDoCheck() {
    if (sessionStorage.getItem('userData') != null) {
      this.isUser = false;
    }
  }
  url = 'http://localhost:8081';
  constructor(private http: HttpClient) {
    this.userBean = JSON.parse(sessionStorage.getItem('userData'));
  }
  getAll() {
    this.userBean = JSON.parse(sessionStorage.getItem('userData'));
    return this.http.get<any>(`${this.url}/get-all/${this.userBean.id}`);
  }
  changePassword(user) {
    return this.http.get<any>(`${this.url}/get-all/${this.userBean.id}`);
  }
  deleteMail(mail) {
    console.log('delete', mail);
    return this.http.delete<any>(`${this.url}/delete/${mail.mid}`);
  }
}
