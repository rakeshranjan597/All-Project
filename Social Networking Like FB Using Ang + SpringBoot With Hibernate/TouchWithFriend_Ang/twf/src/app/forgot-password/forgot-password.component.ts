import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isObject, isNumber } from 'util';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  getImage;

  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) { }

  ngOnInit() {
  }

  checkEmail(form: NgForm) {
    console.log(form.value.email);
    this.http.get(`${this.service.twfUrl}/is-email-exist/${form.value.email}`).subscribe(resp => {
      if (resp !== null) {
        resp = Array.of(resp);
        // console.log(resp);
        const uid = resp[0].uid;
        // console.log(uid);
        this.getProfileImage(uid).then(data => {
          this.getImage = data;
          console.log(this.getImage);
        });
      } else {
        this.toastr.error(`Email Doesn't Exist`);
      }
    });
  }

  getProfileImage(uid: number) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
     return this.http.get(`${this.service.twfUrl}/get-profile-image/${uid}`).subscribe(resp => {
        if (resp !== null) {
          resolve(resp);
        }
      });
    });
  }
}
