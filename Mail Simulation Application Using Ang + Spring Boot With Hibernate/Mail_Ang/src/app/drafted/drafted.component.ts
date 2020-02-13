import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drafted',
  templateUrl: './drafted.component.html',
  styleUrls: ['./drafted.component.css']
})
export class DraftedComponent implements OnInit {

 
  emailDrafted = new Array();
  user;
  constructor(private service: MailService, private toastr: ToastrService , private route: Router) { 
    this.getAll();
  }

  

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
        if (val.status === 'drafted') {
          this.emailDrafted.push(val);
        }
      }
      console.log(this.emailDrafted);
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
