import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private http: HttpClient, private service: StudentService, private router: Router, private toastr: ToastrService) {  }

  ngOnInit() {
    if ( sessionStorage.getItem('librarianBean') == null) {
      alert('~~~~ Login First ~~~~');
      this.router.navigate(['/lib-login']);
    }
  }

  addData(form: NgForm) {
    console.log(form.value);
    this.http.post(`${this.service.lmsURL}/add-book`, form.value).subscribe(resp => {
      if (resp === true) {
        this.toastr.success('Book Successfully Added!!! Add Again');
      } else {
        this.toastr.error('Failed to register');
      }
    });
  }

}
