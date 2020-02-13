import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: StudentService, private router: Router) { }

  ngOnInit() {
  }

  get isLibLoggedIn() {
    return this.service.isLibrarianLoggedIn();
  }

  get isStuLoggedIn() {
    return this.service.isStudentLoggedIn();
  }

  logout() {
    sessionStorage.removeItem('studentBean');
    sessionStorage.removeItem('librarianBean');
    this.service.isLibLoggedIn = false;
    this.service.isStuLoggedIn = false;
    this.router.navigate(['/home']);
  }

}
