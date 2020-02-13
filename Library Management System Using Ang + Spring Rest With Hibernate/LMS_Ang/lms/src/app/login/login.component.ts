import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private service: StudentService, private router: Router, private toastr: ToastrService) {  }

  ngOnInit() {
  }

  loginData(form: NgForm) {
    console.log(form.value);
    this.http.post(`${this.service.lmsURL}/login`, form.value).subscribe(response => {
        // response = Array.of(response);
        console.log(response);
        if (response !== null) {
          this.toastr.success(' Welcome To LMS ');
          sessionStorage.setItem('studentBean', JSON.stringify(response));
          this.router.navigate(['/home']);
          this.service.isStuLoggedIn = true;

        } else {
          this.toastr.error('Failed To Login !!!  Try Again....');
          // alert('Failed To Login !!!  Try Again....');
        }
      });
  }
}
