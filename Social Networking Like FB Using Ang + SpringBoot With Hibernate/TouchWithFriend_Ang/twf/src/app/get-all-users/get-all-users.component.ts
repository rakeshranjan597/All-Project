import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css']
})
export class GetAllUsersComponent implements OnInit, OnChanges {

  user;
  getAllUsers;
  getAllSentFriendRequest = [];
  getAllSentFriendRequestUid = [];
  getAllAcceptedFriendRequest = [];
  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) {
    this.user = JSON.parse(sessionStorage.getItem('userData'));

    // this.getAllSentFriendRequests();
    // this.getAllAcceptedFriendRequests();
    this.getAllUser();
    this.getAllSentFriendRequests();
    this.getAllAcceptedFriendRequests();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    // this.getAllUser();
  }

  getAllSentFriendRequests() {
    this.http.get(`${this.service.twfUrl}/get-all-sent-friend-request/${this.user.uid}`).subscribe(resp => {
      const arr = new Array();
      const arrUid = new Array();
      for (const i in resp) {
        if (resp[i].status === 'add-friend') {
          arr.push(resp[i].toUser);
          arrUid.push(resp[i].toUser.uid);
        }
      }
      this.getAllSentFriendRequest = arr;
      this.getAllSentFriendRequestUid = arrUid;
      console.log(this.getAllSentFriendRequestUid);
    });
  }

  getAllUser() {
    this.http.get(`${this.service.twfUrl}/get-all-users/${this.user.email}`).subscribe(resp => {
      this.getAllSentFriendRequests();
      console.log(resp);
      console.log(this.getAllSentFriendRequestUid);
      console.log(this.getAllSentFriendRequest);
      const arr = new Array();
      for (const i in resp) {
        if (this.getAllSentFriendRequestUid.includes(resp[i].uid) === false )  {
          if (this.getAllAcceptedFriendRequest.includes(resp[i].uid) === false) {
            arr.push(resp[i]);
          }
        }
      }
      this.getAllUsers = arr;
    });
  }

  getAllAcceptedFriendRequests() {
    this.http.get(`${this.service.twfUrl}/get-all-accepted-friend-request/${this.user.uid}`).subscribe(resp => {
      // console.log(resp);
      if (resp !== null) {
        const arr = [];
        for (const i in resp) {
          if (resp[i].status === 'request-accepted') {
            if (resp[i].fromUser.uid !== this.user.uid) {
              arr.push(resp[i].fromUser.uid);
            } else if (resp[i].toUser.uid !== this.user.uid) {
              arr.push(resp[i].toUser.uid);
            }
          }
        }
        this.getAllAcceptedFriendRequest = arr;
        console.log(this.getAllAcceptedFriendRequest);
      }
    });
  }

  addFriend(otherUser) {
    // console.log(otherUser);
    this.http.get(`${this.service.twfUrl}/send-friend-request/${this.user.uid}/${otherUser.uid}`).subscribe(resp => {
      if (resp === 1) {
        this.getAllSentFriendRequests();
        this.getAllUser();
        this.toastr.success('Friend Request Sent');
      } else {
        this.toastr.error('Failed To Sent Friend Request');
      }
    });
  }

  cancelFriend(sent) {
    // console.log(sent);
    this.http.delete(`${this.service.twfUrl}/reject-friend-request/${this.user.uid}/${sent.uid}`).subscribe(resp => {
      if (resp === 1) {
        this.getAllSentFriendRequests();
        this.getAllUser();
        this.toastr.success('Friend Request Cancelled');
      } else {
        this.toastr.error('Failed To Cancel Friend Request');
      }
    });
  }


}
