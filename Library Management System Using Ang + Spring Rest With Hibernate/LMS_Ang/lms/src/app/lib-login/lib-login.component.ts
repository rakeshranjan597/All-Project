import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lib-login',
  templateUrl: './lib-login.component.html',
  styleUrls: ['./lib-login.component.css']
})
export class LibLoginComponent implements OnInit {

  constructor(private http: HttpClient, private service: StudentService, private router: Router, private toastr: ToastrService) {  }

  ngOnInit() {
  }

  loginData(form: NgForm) {
    console.log(form.value);
    this.http.post(`${this.service.lmsURL}/lib-login`, form.value).subscribe(response => {
        // response = Array.of(response);
        console.log(response);
        if (response !== null) {

          this.toastr.success('Welcome To LMS');
          sessionStorage.setItem('librarianBean', JSON.stringify(response));
          this.router.navigate(['/home']);
          this.service.isLibLoggedIn = true;
        } else {
          this.toastr.error('Failed To Login !!!  Try Again....');
        }
      });
  }
}
