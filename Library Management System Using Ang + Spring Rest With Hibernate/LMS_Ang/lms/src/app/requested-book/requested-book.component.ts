import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-requested-book',
  templateUrl: './requested-book.component.html',
  styleUrls: ['./requested-book.component.css']
})

export class RequestedBookComponent implements OnInit {
  studentBeans;
  // getAllRequestedBook;
  getAllRequestedBooks;
  sid;
  constructor(private http: HttpClient, private service: StudentService, private router: Router) {  }

  ngOnInit() {
    if ( sessionStorage.getItem('studentBean') == null) {
      alert('~~~~ Login First ~~~~');
      this.router.navigate(['/login']);
    }

    this.studentBeans = Array.of((JSON.parse(sessionStorage.getItem('studentBean'))));
    this.sid = this.studentBeans[0].sid;

    // this.http.get(`${this.service.lmsURL}/get-all-requested-book/${this.sid}`).subscribe(response => {
    //   if (response !== null) {
    //     console.log(response);
    //     this.getAllRequestedBook = response;
    //   } else {
    //     alert('No Requested Record');
    //     this.router.navigate(['/search-book']);
    //   }
    // });

    this.http.get(`${this.service.lmsURL}/get-all-requested-books/${this.sid}`).subscribe(response => {
      if (response !== null) {
        console.log(response);
        this.getAllRequestedBooks = response;
      } else {
        alert('No Requested Record');
        this.router.navigate(['/search-book']);
      }

    });

  }

}
