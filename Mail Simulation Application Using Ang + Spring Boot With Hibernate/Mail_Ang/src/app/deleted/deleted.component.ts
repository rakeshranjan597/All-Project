import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css']
})
export class DeletedComponent implements OnInit {

  emailDeleted = new Array();
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
        if (val.status === 'deleted'){
          this.emailDeleted.push(val);
        }
      }
      console.log(this.emailDeleted);
    });
  }
}
