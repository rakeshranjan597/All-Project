import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  public getbookById;
  public sid;
  studentBeans;
  constructor(private http: HttpClient, private service: StudentService, private router: Router, private toastr: ToastrService) {  }

  ngOnInit() {
    if ( sessionStorage.getItem('studentBean') == null) {

      alert('~~~~ Login First ~~~~');
      this.router.navigate(['/login']);
    }

    this.studentBeans = Array.of((JSON.parse(sessionStorage.getItem('studentBean'))));
    this.sid = this.studentBeans[0].sid;
  }

  searchBookById(form: NgForm) {
    console.log(form.value);
    this.http.post(`${this.service.lmsURL}/search-book-by-id`, form.value).subscribe(resp => {
      if (resp !== null) {
        Array.of(resp);
        if (resp.bquantity !== 0) { //  No Error Here
          console.log(resp);
          this.getbookById = Array.of(resp);
        } else {
          this.toastr.error('Book Not Available !!!');
        // alert('Book Not Available !!!');
        }
      } else {
        this.toastr.error('Book Not Available !!!');
        // alert('Book Not Available !!!');
      }
    });
  }

  requestBook(bid) {
    console.log(bid);
    this.http.get(`${this.service.lmsURL}/request-book/${this.sid}/${bid}`).subscribe(response => {
      if (response === 1) {
        alert('~~~~ Requested Succefully ~~~~');
      } else if (response === 0) {
        alert('~~~ Book Already Requested ~~~~');
      } else if (response === -1) {
        alert('~~~~ Falied To Request Book ~~~~');
      }
    });
  }

}
