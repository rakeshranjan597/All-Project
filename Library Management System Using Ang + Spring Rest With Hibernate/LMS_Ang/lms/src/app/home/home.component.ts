import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  studentBeans;
  librarianBeans;
  value;
  constructor( private router: Router, private service: StudentService) { }

  ngOnInit() {

    if ( this.service.isLibLoggedIn === true) {
      this.librarianBeans = Array.of((JSON.parse(sessionStorage.getItem('librarianBean'))));
    } else if (this.service.isStuLoggedIn === true) {
      this.studentBeans = Array.of((JSON.parse(sessionStorage.getItem('studentBean'))));
    }

    // if ( sessionStorage.getItem('studentBean') !== null) {
    //   this.librarianBeans = Array.of((JSON.parse(sessionStorage.getItem('librarianBean'))));
    //   this.value = this.librarianBeans[0].lname;

    // } else if ( sessionStorage.getItem('librarianBean') == null) {
    //   this.studentBeans = Array.of((JSON.parse(sessionStorage.getItem('studentBean'))));
    //   this.value = this.studentBeans[0].sname;
    // }
  }

}
