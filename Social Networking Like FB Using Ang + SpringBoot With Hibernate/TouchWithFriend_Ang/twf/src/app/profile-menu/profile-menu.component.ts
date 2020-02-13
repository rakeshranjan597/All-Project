import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnChanges, OnInit {

  state;
  user;
  selectedAbout;
  selectedFriends;
  selectedPhotos;
  selectedFile;
  getImages = {};
  imgURL;
  inputFile = true;
  uploadButton = false;
  messageValue = '';
  showEmojiPicker = false;
  likeUnlike = false;
  header;
  sticky;

  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) {
    this.user = JSON.parse(sessionStorage.getItem('userData'));

    if (window.history.state.data !== undefined) {
      this.user = window.history.state.data;
      window.history.state.data = undefined;
    }

    if (window.history.state.otherUserProfileData !== undefined) {
      this.user = window.history.state.otherUserProfileData;
    }

    this.getProfileImage();

  }

  ngOnInit() {
    // console.log(window.history.state.navigationId);
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    // console.log(window.history.state);
  }


  aboutData(user) {
    this.selectedAbout = user;
    this.selectedFriends = false;
    this.selectedPhotos = false;
    // console.log(`About`, this.selectedAbout);
  }

  friendsData(user) {
    this.selectedFriends = user;
    this.selectedAbout = false;
    this.selectedPhotos = false;
    // console.log(`Friends`, this.selectedFriends);
  }

  photosData(user) {
    this.selectedPhotos = user;
    this.selectedAbout = false;
    this.selectedFriends = false;
    // console.log('Photos', this.selectedPhotos);
  }

  // getChildValue($event) {
  //   if ($event) {
  //     this.user = $event;
  //   }
  // }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    this.inputFile = false;
    this.uploadButton = true;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  uplaodProfile() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

    this.http.post(`${this.service.twfUrl}/image-upload/${this.user.uid}/${this.user.name}/${'profile'}/${'null'}`,
     uploadData, {responseType: 'text' as 'json'})
    .subscribe(resp => {
      if (resp === 'upload') {
        this.toastr.success('Upload Successfully');
        this.inputFile = true;
        this.uploadButton = false;
        this.imgURL = '';

        this.getProfileImage();
      } else if (resp === 'failed') {
        this.toastr.success('Failed To Uploaded');
        this.inputFile = true;
        this.uploadButton = false;
        this.imgURL = '';
      }
    });
  }

  getProfileImage() {
    this.http.get(`${this.service.twfUrl}/get-profile-image/${this.user.uid}`).subscribe(resp => {
      if (resp !== null) {
        this.getImages = resp;
        // console.log(this.getImages);
      }
    });
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    this.messageValue = `${this.messageValue}${event.emoji.native}`;
    this.showEmojiPicker = false;
  }

  likeUnlikeOnProfileImage(getImages) {
    const currentUser = JSON.parse(sessionStorage.getItem('userData'));
    const iid = getImages.iid;
    const uid = currentUser.uid;
    const userName = currentUser.name;
    // console.log(iid, uid, userName);
    this.http.get(`${this.service.twfUrl}/like-unlike-on-profile-image/${iid}/${uid}/${userName}`, {responseType: 'text' as 'json'})
    .subscribe(resp => {
      if (resp === 'like') {
        console.log(resp);
        this.likeUnlike = true;
        this.getProfileImage();

      } else if (resp === 'unlike') {
        console.log(resp);
        this.likeUnlike = false;
        this.getProfileImage();

      } else if (resp === 'failed') {
        console.log(resp);
      }
    });
  }

  checkLikeUnlikeOnProfileImage(getImages) {
    console.log(getImages);
    const currentUser = JSON.parse(sessionStorage.getItem('userData'));
    const iid = getImages.iid;
    const uid = currentUser.uid;
    this.http.get(`${this.service.twfUrl}/check-like-unlike-on-profile-image/${iid}/${uid}`, {responseType: 'text' as 'json'})
    .subscribe(resp => {
      if (resp === 'likeAvailable') {
        this.likeUnlike = true;
        console.log(resp);
      } else if (resp === 'likeNotAvailable') {
        this.likeUnlike = false;
        console.log(resp);
      } else if (resp === 'failed') {
        console.log(resp);
      }
    });
  }


}
