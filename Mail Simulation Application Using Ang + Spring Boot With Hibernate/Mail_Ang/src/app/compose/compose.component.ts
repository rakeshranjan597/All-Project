import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailService } from '../mail.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  toBean;
  fromBean;
  isEmail = false;
  constructor(private route: Router, private http: HttpClient, private service: MailService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  searchEmail(form) {
    console.log(form.value);
    this.http.get<any>(`http://localhost:8081/search/${form.value.email}`).subscribe(resp => {
      if (resp.status_code === 201) {
        this.toBean = resp.userBean[0];
        this.isEmail = true;
        console.log(resp.userBean[0]);
      } else {
        this.toastr.error('Email Does not Exist');
      }
    });
  }
  composeEmail(email) {
    this.fromBean = JSON.parse(sessionStorage.getItem('userData'));
    console.log(email.value, this.fromBean, this.toBean);
    this.http.get(`http://localhost:8081/compose/${email.value.subject}/${email.value.message}/${this.toBean.id}/${this.fromBean.id}`).subscribe(resp => {
      if (resp !== null) {
        console.log(resp);
        email.reset();
        this.route.navigate(['/home']);
        this.toastr.success('your Message has sent');
      } else {
        this.toastr.error('Failed To send Email');
      }

    })
  }

}
