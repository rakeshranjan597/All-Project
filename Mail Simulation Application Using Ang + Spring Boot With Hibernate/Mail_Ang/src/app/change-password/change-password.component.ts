import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MailService } from '../mail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private route: Router, private http: HttpClient, private service: MailService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  confirmPassword(form) {
    console.log(form.value);
    if( form.value.password === form.value.cpassword ){
      this.http.get(`${this.service.url}/changePassword/${form.value.email}/${form.value.password}`).subscribe( resp => {
        if ( resp !== null) {
          this.toastr.success('Password Changed');
          console.log(resp);
        } else {
          this.toastr.error(' Failed To Change The Password');
  
        }
      });
    } else {
      this.toastr.error(' Both Password Must Be Same ');
    }
  }
}
