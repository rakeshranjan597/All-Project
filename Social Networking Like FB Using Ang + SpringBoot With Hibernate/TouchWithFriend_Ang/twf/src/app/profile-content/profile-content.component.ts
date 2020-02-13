import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit, OnChanges {

  @Input() selectedAboutData;
  @Input() selectedFriendsData;
  @Input() selectedPhotosData;

  user;
  getAllAcceptedFriendRequest;
  totalFriends;

  getAllProfilePhotosData;
  getAllTimeLinePhotosData;
  getAllPhotosData;

  totalPhotos;
  totalProfilePhotos;
  totalTimeLinePhotos;
  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) {
    this.user = JSON.parse(sessionStorage.getItem('userData'));

  }

  ngOnInit() {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.getAllAcceptedFriendRequests();

    if (this.selectedPhotosData) {
      // console.log(this.selectedPhotosData);
      this.getAllPhotos(this.selectedPhotosData.uid);
    }
  }

  getAllAcceptedFriendRequests() {
    let userData;
    if (this.selectedAboutData) {
      userData = this.selectedAboutData;
    } else if (this.selectedFriendsData) {
      userData = this.selectedFriendsData;
    } else if (this.selectedPhotosData) {
      userData = this.selectedPhotosData;
    }
    this.http.get(`${this.service.twfUrl}/get-all-accepted-friend-request/${userData.uid}`).subscribe(resp => {
      // console.log(resp);
      if (resp !== null) {
        const arr = [];
        for (const i in resp) {
          if (resp[i].status === 'request-accepted') {
            if (resp[i].fromUser.uid !== userData.uid) {
              const localArr = [];
              localArr.push(resp[i].fid, resp[i].fromUser);

              this.getProfileImage(resp[i].fromUser.uid).then(data => {
                localArr.push(data[0].imageBytes);
              });

              arr.push(localArr);
            } else if (resp[i].toUser.uid !== userData.uid) {
              const localArr = [];
              localArr.push(resp[i].fid, resp[i].toUser);

              this.getProfileImage(resp[i].toUser.uid).then(data => {
                localArr.push(data[0].imageBytes);
              });

              arr.push(localArr);
            }
          }
        }
        this.getAllAcceptedFriendRequest = arr;
        this.totalFriends = this.getAllAcceptedFriendRequest.length;
        // console.log(this.getAllAcceptedFriendRequest);
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

  getAllProfilePhotos() {
    if (this.totalPhotos === 0) {
      this.totalProfilePhotos = 0;
    } else {
      const arr = [];
      for (const i of this.getAllPhotosData) {
        if (i.imageStatus === 'profile') {
          arr.push(i);
        }
      }
      this.totalProfilePhotos = arr.length;
      this.getAllProfilePhotosData = [...arr];
    }
    // console.log(this.getAllProfilePhotosData);
  }

  getAllTimeLinePhotos() {
    if (this.totalPhotos === 0) {
      this.totalTimeLinePhotos = 0;

    } else {
      const arr = [];
      for (const i of this.getAllPhotosData) {
        if (i.imageStatus === 'post') {
          arr.push(i);
        }
      }
      this.totalTimeLinePhotos = arr.length;
      this.getAllTimeLinePhotosData = [...arr];
    }
    // console.log(this.getAllTimeLinePhotosData);
  }

  getAllPhotos(uid: number) {
    return new Promise(resolve => {
      return this.http.get(`${this.service.twfUrl}/get-all-photos/${uid}`).subscribe(resp => {
        if (resp !== null) {
          // console.log(resp);
          this.getAllPhotosData = Array.prototype.reverse.apply(resp);
          this.totalPhotos = Object(resp).length;
          console.log(this.totalPhotos);
          resolve(resp);
        }
      });
    });
  }
}
