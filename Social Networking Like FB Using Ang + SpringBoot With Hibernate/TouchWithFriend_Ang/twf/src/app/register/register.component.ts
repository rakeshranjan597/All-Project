import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedFile = null;
  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) { }

  ngOnInit() {
  }

  registerData(form: NgForm) {
    // form.value.profilePic = this.selectedFile;
    // console.log(form.value);
    this.http.post(`${this.service.twfUrl}/register`, form.value, {responseType: 'text' as 'json'}).subscribe(resp => {
      // console.log(resp);
      if (resp === 'registered') {
        this.toastr.success('Registered Successfully');
        this.route.navigate(['/login']);

      } else if (resp === 'email-exist') {
        this.toastr.error('Email Id Already Exist');

      } else if (resp === 'mobile-exist') {
        this.toastr.error('Mobile Number Already Exist');

      } else if (resp === 'failed') {
        this.toastr.error('Failed To Register');
      }
    });
  }
}
