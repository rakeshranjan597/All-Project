import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // message: string;

  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) { }

  ngOnInit() {
  }

  loginData(form: NgForm) {
    // console.log(form);
    this.http.post(`${this.service.twfUrl}/login`, form.value).subscribe(resp => {
      // console.log(resp);
      if (resp !== null) {
        const arr = Object.values(resp);
        // console.log(arr);
        if (arr[0] === 0) {
        this.toastr.error(`Incorrect Password`);

      } else {
        this.service.isUser = true;
        sessionStorage.setItem('userData', JSON.stringify(resp));
        this.route.navigateByUrl('/home');
        }

      } else {
        this.toastr.error(`Email Does'nt Exist!!! Register First`);
      }
    });
  }



}
