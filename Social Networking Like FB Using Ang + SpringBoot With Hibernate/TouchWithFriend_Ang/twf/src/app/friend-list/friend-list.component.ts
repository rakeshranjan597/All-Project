import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  user;
  getAllAcceptedFriendRequest;
  isFriendData;

  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) {
    this.user = JSON.parse(sessionStorage.getItem('userData'));

    this.getAllAcceptedFriendRequests();
  }

  ngOnInit() {
  }

  getAllAcceptedFriendRequests() {
    this.http.get(`${this.service.twfUrl}/get-all-accepted-friend-request/${this.user.uid}`).subscribe(resp => {
      // console.log(resp);
      if (resp !== null) {
        const arr = [];
        for (const i in resp) {
          if (resp[i].status === 'request-accepted') {
            if (resp[i].fromUser.uid !== this.user.uid) {
              const localArr = [];
              localArr.push(resp[i].fid, resp[i].fromUser);
              arr.push(localArr);
            } else if (resp[i].toUser.uid !== this.user.uid) {
              const localArr = [];
              localArr.push(resp[i].fid, resp[i].toUser);
              arr.push(localArr);
            }
          }
        }
        this.getAllAcceptedFriendRequest = arr;
        if (this.getAllAcceptedFriendRequest.length === 0) {
          this.isFriendData = 0;
        }
        console.log(this.getAllAcceptedFriendRequest);
      }
    });
  }

  message(friend) {
    console.log(friend[0], friend[1].uid);
  }

  otherUserProfile(friend) {
    // console.log(friend);
    this.route.navigateByUrl('/profile-menu', {state: { data: friend[1] } });
  }
}
