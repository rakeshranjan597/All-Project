import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lib-requested-book',
  templateUrl: './lib-requested-book.component.html',
  styleUrls: ['./lib-requested-book.component.css']
})
export class LibRequestedBookComponent implements OnInit {
  // currentStatus = 0;
  librarianBeans;
  getAllReceivedRequestedBook;
  lid;
  constructor(private http: HttpClient, private service: StudentService, private router: Router, private toastr: ToastrService) {
    this.getAllReceivedRequestedBooks();

    }

  ngOnInit() {
    if ( sessionStorage.getItem('librarianBean') == null) {
      alert('~~~~ Login First ~~~~');
      this.router.navigate(['/lib-login']);
    }

    this.librarianBeans = Array.of((JSON.parse(sessionStorage.getItem('librarianBean'))));
    this.lid = this.librarianBeans[0].lid;

  }

  getAllReceivedRequestedBooks() {
    this.http.get(`${this.service.lmsURL}/get-all-received-requested-book`).subscribe(response => {
      if (response !== null) {
        console.log(response);
        this.getAllReceivedRequestedBook = response;
      } else {
        this.toastr.info('No Received Requested Available');
        this.router.navigate(['/home']);
      }
    });
  }

  actionOnBook(tid, sValue, bid) {
    console.log(tid, sValue);
    this.http.get(`${this.service.lmsURL}/action-on-requested-book/${tid}/${sValue}/${bid}`).subscribe(response => {
      if (response === 1) {
        this.getAllReceivedRequestedBooks();
        this.toastr.success('Book Approved');
      } else if (response === -1) {
        this.toastr.error('Book Rejected');
      } else {
        this.toastr.warning('Something Went Wrong');
      }
    });
  }

}
