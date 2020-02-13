import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailService } from '../mail.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private http: HttpClient, private service: MailService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  loginData(user) {
    console.log(user.value);
    this.http.put<any>(`${this.service.url}/login/${user.value.email}/${user.value.password}`, user.value).subscribe( resp => {
      console.log(resp);
      this.toastr.success('Login Success');
      sessionStorage.setItem('userData', JSON.stringify(resp.userBean[0]));
      console.log(resp.userBean[0]);
      this.route.navigate(['/home']);
    }, err => {
      this.toastr.error('Failed To Login');
      console.log('error');
    }, () => {
      console.log('success');
      user.reset();
    });
  }

}
