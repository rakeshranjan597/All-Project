import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  user;
  getAllReceivedFriendRequest;
  isReceivedData;
  isSentData;

  isSent = false;
  isReceived = true;

  getAllSentFriendRequest = [];
  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) {
    this.user = JSON.parse(sessionStorage.getItem('userData'));

    this.getAllReceivedFriendRequests();
    this.getAllSentFriendRequests();
  }

  ngOnInit() {
  }

  getAllReceivedFriendRequests() {
    this.http.get(`${this.service.twfUrl}/get-all-received-friend-request/${this.user.uid}`).subscribe(resp => {
      console.log(resp);
      if (resp !== null) {
        // this.getAllReceivedFriendRequest = resp;
        const arr = [];
        for (const i in resp) {
          if (resp[i].status === 'add-friend') {
            arr.push(resp[i].fromUser);
          }
        }
        this.getAllReceivedFriendRequest = arr;
        if (this.getAllReceivedFriendRequest.length === 0) {
          this.isReceivedData = 0;
        }
        // console.log(this.getAllReceivedFriendRequest);
      }
    });
  }

  getAllSentFriendRequests() {
    this.http.get(`${this.service.twfUrl}/get-all-sent-friend-request/${this.user.uid}`).subscribe(resp => {
      const arr = [];
      for (const i in resp) {
        if (resp[i].status === 'add-friend') {
          arr.push(resp[i].toUser);
        }
      }
      this.getAllSentFriendRequest = arr;
      if (this.getAllSentFriendRequest.length === 0) {
        this.isSentData = 0;
      }
    });
  }

  cancelFriend(sent) {
    // console.log(sent);
    this.http.delete(`${this.service.twfUrl}/reject-friend-request/${this.user.uid}/${sent.uid}`).subscribe(resp => {
      if (resp === 1) {
        this.getAllSentFriendRequests();
        this.toastr.success('Friend Request Cancelled');
      } else {
        this.toastr.error('Failed To Cancel Friend Request');
      }
    });
  }

  acceptRequest(userRequest) {
    console.log(userRequest);
    this.http.get(`${this.service.twfUrl}/accept-friend-request/${userRequest.uid}/${this.user.uid}`).subscribe(resp => {
      if (resp === 1) {
        this.getAllReceivedFriendRequests();
        this.toastr.success('Friend Request Accepetd');
      } else {
        this.toastr.error('Failed To Accept Friend Request');
      }
    });
  }

  rejectRequest(userRequest) {
    console.log(userRequest);
    this.http.delete(`${this.service.twfUrl}/reject-friend-request/${userRequest.uid}/${this.user.uid}`).subscribe(resp => {
      if (resp === 1) {
        this.getAllReceivedFriendRequests();
        this.toastr.success('Friend Request Rejected');
      } else {
        this.toastr.error('Failed To Reject Friend Request');
      }
    });
  }

  // viewReceived() {
  //   return true;
  // }

  viewSent() {
    this.isReceived = false;
    this.isSent = true;
  }

  viewReceived() {
    this.isReceived = true;
    this.isSent = false;
  }
}
