import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lib-history',
  templateUrl: './lib-history.component.html',
  styleUrls: ['./lib-history.component.css']
})
export class LibHistoryComponent implements OnInit {

  getAllBookReturnedDetails;

  constructor(private serive: StudentService, private http: HttpClient, private router: Router) { }

  ngOnInit() {

    if ( sessionStorage.getItem('librarianBean') == null) {
      alert('~~~~ Login First ~~~~');
      this.router.navigate(['/lib-login']);
    }

    this.http.get(`${this.serive.lmsURL}/get-all-book-returned-details`).subscribe( response => {
      if (response !== null) {
        this.getAllBookReturnedDetails = response;
      } else {
        alert('~~~~ No Returned Book ~~~~');
      }
    });

  }

}
