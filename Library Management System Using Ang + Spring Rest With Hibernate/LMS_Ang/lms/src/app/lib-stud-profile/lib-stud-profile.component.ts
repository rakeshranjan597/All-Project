import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lib-stud-profile',
  templateUrl: './lib-stud-profile.component.html',
  styleUrls: ['./lib-stud-profile.component.css']
})
export class LibStudProfileComponent implements OnInit {

  clickStatus;
  getAllStudentsDetails;
  getAllBookTransactionDetails;

  constructor(private http: HttpClient, private service: StudentService, private router: Router) { }

  ngOnInit() {

    if ( sessionStorage.getItem('librarianBean') == null) {
      alert('~~~~ Login First ~~~~');
      this.router.navigate(['/lib-login']);
    }

    this.http.get(`${this.service.lmsURL}/get-all-students-details`).subscribe(response => {
      if (response !== null) {
        this.getAllStudentsDetails = response;
      } else {
        alert('~~~~ Records Empty ~~~~');
      }
    });

    this.http.get(`${this.service.lmsURL}/get-all-book-transaction-details`).subscribe(response => {
      if (response !== null) {
        this.getAllBookTransactionDetails = response;
      } else {
        alert('~~~~ Data Not Available ~~~~');
      }
    });

  }

  generateStatus(status) {
    this.clickStatus = status;
    console.log(status);
  }

}
