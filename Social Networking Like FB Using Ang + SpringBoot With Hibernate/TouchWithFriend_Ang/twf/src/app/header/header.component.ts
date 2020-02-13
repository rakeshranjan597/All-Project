import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: UserService, private route: Router) {
  }

  ngOnInit() {  }

  get isUser() {
    return this.service.isUserLoggedIn();
  }

  logout() {
    sessionStorage.removeItem('userData');
    this.service.isUser = false;
    this.route.navigate(['/login']);
  }

}
