import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lib-return-book',
  templateUrl: './lib-return-book.component.html',
  styleUrls: ['./lib-return-book.component.css']
})
export class LibReturnBookComponent implements OnInit {

  getAllStudentsApprovedBook;
  getTransactions;
  getBooks;
  constructor(private http: HttpClient, private service: StudentService, private router: Router, private toasts: ToastrService) {
    this.getAllStudentsApprovedBooks();
  }

  ngOnInit() {

    if ( sessionStorage.getItem('librarianBean') == null) {
      alert('~~~~ Login First ~~~~');
      this.router.navigate(['/lib-login']);
    }

  }

  getAllStudentsApprovedBooks() {
    this.http.get(`${this.service.lmsURL}/get-all-students-approved-book`).subscribe(response => {
      if (response !== null) {
        console.log(response);
        this.getAllStudentsApprovedBook = response;
      }
    });
  }

  getTransaction(tid) {
    this.getTransactions = this.getAllStudentsApprovedBook.filter(val => val.tid === tid );
  }

  getBook(bid) {
    this.http.get(`${this.service.lmsURL}/get-book-by-id/${bid}`).subscribe(response => {
      console.log(response);
      if (response !== null) {
        this.getBooks = Array.of(response);
      }
    });
  }

  returnBook(tid, sid, bid) {
    console.log(tid, sid, bid);
    this.http.get(`${this.service.lmsURL}/return-book/${tid}/${sid}/${bid}`).subscribe(response => {
      if (response === 1) {
        this.getAllStudentsApprovedBooks();
        this.toasts.success('Book Submited');
      } else {
        this.toasts.error('Failed To Submit');
      }
    });
  }

  // filt(event) {
  //   console.log(event.target.value);
  // }

}
