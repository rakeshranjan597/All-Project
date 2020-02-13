import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private service: StudentService, private router: Router) { }

  ngOnInit() {
  }

  registerData(form: NgForm) {
    // form.value.sid = Number(form.value.sid);
    console.log(form.value);
    this.http.post(`${this.service.lmsURL}/register`, form.value).subscribe(resp => {
      if (resp !== 0) {
        alert('Successfully Registered and Your id is ' + resp + ' Please Capture the Id');
        form.reset();
        this.router.navigate(['/login']);
      } else {
        alert('~~~~ Failed to register ~~~~');
      }
    });
  }

}
