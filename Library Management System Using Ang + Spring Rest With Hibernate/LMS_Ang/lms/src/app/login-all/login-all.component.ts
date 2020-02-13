import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-all',
  templateUrl: './login-all.component.html',
  styleUrls: ['./login-all.component.css']
})
export class LoginAllComponent implements OnInit {

  constructor(private http: HttpClient, private service: StudentService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  loginData(form: NgForm) {
    console.log(form.value);
    console.log(form.value.type);

    if (form.value.type === 'S') {
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

    } else if (form.value.type === 'L') {
      const valueNew = {
        lid : form.value.sid,
        lpassword: form.value.spassword
      };
      console.log(valueNew);
      this.http.post(`${this.service.lmsURL}/lib-login`, valueNew).subscribe(response => {
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

}
