import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { isObject, isArray } from 'util';
import { resolve } from 'url';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnChanges {

  user;
  selectedFile: File;
  imgURL;
  getImages = {};
  url;
  getAllUserPosts = [];

  getAllAcceptedFriendRequest;
  isFriendData;

  captionValue = '';
  fileValue = '';

  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) {
    this.user = JSON.parse(sessionStorage.getItem('userData'));
    // console.log(this.user);

    this.getAllUserPost();
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    // this.getAllUserPost();
  }


  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  uplaodPost() {
    // let captionValue = (document.getElementById('caption') as HTMLInputElement).value;
    // let fileValue = (document.getElementById('file-input') as HTMLInputElement).value;
    // console.log(this.captionValue);
    // console.log(this.fileValue);
    if (this.captionValue === '' && this.fileValue === '') {
      this.toastr.info(`Both Fields can't be empty`);
    } else {
      if (this.captionValue === '') {
        this.captionValue = null;
      }
      if (this.fileValue === '') {
        this.toastr.info('File can`t be empty');
        return;
      }
      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
      this.http.post(`${this.service.twfUrl}/image-upload/${this.user.uid}/${this.user.name}/${'post'}/${this.captionValue}`,
       uploadData, {responseType: 'text' as 'json'}).subscribe(resp => {
        if (resp === 'upload') {
          this.toastr.success('Upload Successfully');
          this.captionValue = '';
          this.fileValue = '';
          this.imgURL = '';
          this.getAllUserPosts = [];
          this.getAllUserPost();

        } else if (resp === 'failed') {
          this.toastr.success('Failed To Uploaded');
          this.captionValue = '';
          this.fileValue = '';
          this.imgURL = '';

        }
      });
    }
  }

  getAllUserPost() {
    this.getAllAcceptedFriendRequests(this.user.uid).then((data: any[]) => {
      if (data !== null) {
        for (const uid of data) {
          this.http.get(`${this.service.twfUrl}/get-all-user-post/${uid}/${'post'}`).subscribe(resp => {
            if (resp !== null) {
              // Array.prototype.reverse.apply(resp);

              // tslint:disable-next-line: forin
              for (const i in resp) {
                this.getProfileImage(resp[i].uid).then(data2 => {
                  Object.assign(resp[i], {profileImageBytes: data2[0].imageBytes});
                  // const addObj = {uname: data[0].uname};
                  // resp[i] = {...resp[i], ...addObj};
                });
                if (resp[i].imageLikes > 0) {
                  this.getImageLikesUsers(resp[i].iid).then(data3 => {
                    Object.assign(resp[i], {imageLikesUsers: data3});
                  });
                }
                this.getAllUserPosts.push(resp[i]);
              }
              this.getAllUserPosts.sort((a, b) => b.iid - a.iid);
              // console.log(this.getAllUserPosts);
            }
          });
        }
      }
    });
  }

  getImageLikesUsers(iid: number) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      return this.http.get(`${this.service.twfUrl}/get-image-likes-users/${iid}`).subscribe(resp => {
        resolve(resp);
      });
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

  likeUnlikeOnProfileImage(post, imageLikesUsers) {
    const currentUser = JSON.parse(sessionStorage.getItem('userData'));
    const uid = currentUser.uid;
    const iid = post.iid;
    const userName = currentUser.name;
    // console.log(iid, uid, userName);
    this.http.get(`${this.service.twfUrl}/like-unlike-on-profile-image/${iid}/${uid}/${userName}`, {responseType: 'text' as 'json'})
    .subscribe(resp => {
      if (resp === 'like') {
        console.log(resp);
        this.getAllUserPosts = [];
        this.getAllUserPost();
        // this.isPostLiked(uid, imageLikesUsers);

      } else if (resp === 'unlike') {
        console.log(resp);
        this.getAllUserPosts = [];
        this.getAllUserPost();
        // this.isPostLiked(uid, imageLikesUsers);

      } else if (resp === 'failed') {
        // console.log(resp);
      }
    });
  }

  getAllAcceptedFriendRequests(uid: number) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      return this.http.get(`${this.service.twfUrl}/get-all-accepted-friend-request/${uid}`).subscribe(resp => {
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
           arr.push(uid);
           resolve(arr);
         }
       });
    });
  }

  isPostLiked(uid: number, imageLikesUsers) {
    if (imageLikesUsers) {
      for (const i of imageLikesUsers) {
        if (i.uid === uid) {
          // console.log(uid);
          return true;
        }
      }
    }
    return false;
  }


}
