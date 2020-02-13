import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailService } from '../mail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private service: MailService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  registerData(user) {
    console.log(user.value);
    this.http.put(`http://localhost:8081/register`, user.value).subscribe(resp => {
      console.log(resp);
      user.reset();
    }, err => {
      console.log('error');
      this.toastr.error('Email Already Exist');
    }, () => {
      this.toastr.success('Register Successfully');
      console.log('success');
    });
  }
}
