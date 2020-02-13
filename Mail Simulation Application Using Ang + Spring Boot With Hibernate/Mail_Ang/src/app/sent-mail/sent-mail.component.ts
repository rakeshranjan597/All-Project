import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sent-mail',
  templateUrl: './sent-mail.component.html',
  styleUrls: ['./sent-mail.component.css']
})
export class SentMailComponent implements OnInit {

  constructor(private service: MailService, private toastr: ToastrService , private route: Router) { 
    this.getAll();
  }

  
  emailSent = new Array();
  user;
  ngOnInit() {
    if (sessionStorage.getItem('userData') === null) {
      this.toastr.error('Login First');
      this.route.navigate(['/login']);
    } else {
      this.user = JSON.parse(sessionStorage.getItem('userData'));
      console.log(this.user);
    }
  }

  getAll() {
    this.service.getAll().subscribe( resp => {
      console.log(resp);
      for(let val of resp.mailBean) {
        if (val.status === 'sent'){
          this.emailSent.push(val);
        }
      }
      console.log(this.emailSent);
    });
  }
  
  deleteData(mail) {
    console.log(mail);
    this.service.deleteMail(mail).subscribe( resp => {
      if ( resp !== null) {
        this.toastr.success('Mail Deleted');
      } else {
        this.toastr.error('Failed to Delete');
      }
    });
  }
}
