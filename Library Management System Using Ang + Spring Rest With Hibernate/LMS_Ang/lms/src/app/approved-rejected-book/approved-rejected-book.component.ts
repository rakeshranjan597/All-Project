import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-approved-rejected-book',
  templateUrl: './approved-rejected-book.component.html',
  styleUrls: ['./approved-rejected-book.component.css']
})
export class ApprovedRejectedBookComponent implements OnInit {

  getAllApprovedRejectedBook;

  constructor(private http: HttpClient, private service: StudentService, private router: Router) { }

  ngOnInit() {
    if ( sessionStorage.getItem('librarianBean') == null) {
      alert('~~~~ Login First ~~~~');
      this.router.navigate(['/lib-login']);
    }

    this.http.get(`${this.service.lmsURL}/get-all-approved-rejected-book`).subscribe(response => {
      if (response !== null) {
        console.log(response);
        this.getAllApprovedRejectedBook = response;
      } else {
        alert('~~~~ No Approved & Rejected Available ~~~~');
        this.router.navigate(['/home']);
      }
    });

  }

}
