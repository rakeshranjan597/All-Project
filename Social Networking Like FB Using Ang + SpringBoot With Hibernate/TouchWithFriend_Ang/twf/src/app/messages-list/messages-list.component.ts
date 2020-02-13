import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  user;
  getAllAcceptedFriendRequest;
  selectedUser;
  isFriendData;
  lastMessage;
  sentTime;

  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) {
    this.user = JSON.parse(sessionStorage.getItem('userData'));

    this.getAllAcceptedFriendRequests();
  }

  ngOnInit() { }

  getAllAcceptedFriendRequests() {
    this.http.get(`${this.service.twfUrl}/get-all-accepted-friend-request/${this.user.uid}`).subscribe(resp => {
      // console.log(resp);
      if (resp !== null) {
        const arr = [];
        for (const i in resp) {
          if (resp[i].status === 'request-accepted') {
            if (resp[i].fromUser.uid !== this.user.uid) {
              const localArr = [];
              arr.push(localArr);
              localArr.push(resp[i].fid, resp[i].fromUser);

              this.getUnSeenMessages(resp[i].fid, resp[i].fromUser.uid).then(data => {
                let newText = data[1];
                if (newText.length >= 18) {
                  newText = `${newText.substr(0, 18)}...`;
                  console.log(newText);
                }
                localArr.push(data[0], newText, data[2], data[3]);
              });

              this.getProfileImage(resp[i].fromUser.uid).then(data => {
                // console.log(data);
                localArr.push(data[0].imageBytes);
              });

            } else if (resp[i].toUser.uid !== this.user.uid) {
              const localArr = [];
              arr.push(localArr);
              localArr.push(resp[i].fid, resp[i].toUser);

              this.getUnSeenMessages(resp[i].fid, resp[i].toUser.uid).then(data => {
                let newText = data[1];
                if (newText.length >= 18) {
                  newText = `${newText.substr(0, 18)}...`;
                  console.log(newText);
                }
                localArr.push(data[0], newText, data[2], data[3]);
              });

              this.getProfileImage(resp[i].toUser.uid).then(data => {
                // console.log(data);
                localArr.push(data[0].imageBytes);
              });
            }
          }
        }
        this.getAllAcceptedFriendRequest = arr;
        if (this.getAllAcceptedFriendRequest.length === 0) {
          this.isFriendData = 0;
          console.log(this.isFriendData);
        }
        console.log(this.getAllAcceptedFriendRequest);
      }
    });
  }

  getProfileImage(uid: number) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
     return this.http.get(`${this.service.twfUrl}/get-profile-image/${uid}`).subscribe(resp => {
        if (resp !== null) {
          resolve(Array.of(resp));
        }
      });
    });
  }

  getUnSeenMessages(fid: number, uid: number) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      return this.http.get(`${this.service.twfUrl}/get-unseen-messages/${fid}/${uid}`).subscribe(resp =>  {
        resolve(resp);
      });
    });
  }


  sendUser(user) {
    this.http.get(`${this.service.twfUrl}/make-seen/${user[0]}/${user[1].uid}`).subscribe(resp => {
      // console.log(resp);
      this.getAllAcceptedFriendRequests();
    });
    this.selectedUser = user;
    // console.log(user);
  }

}
