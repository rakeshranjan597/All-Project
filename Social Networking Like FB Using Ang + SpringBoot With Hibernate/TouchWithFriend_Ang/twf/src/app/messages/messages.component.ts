import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnChanges {

  @ViewChild('scrollBottom', {static: false}) private scrollBottom: ElementRef;
  @Input() user;
  myUser;
  fid;
  getAllUserMessage;
  messageValue = '';
  showEmojiPicker = false;

  constructor(private service: UserService, private toastr: ToastrService, private http: HttpClient, private route: Router) {
    this.myUser = JSON.parse(sessionStorage.getItem('userData'));

  }

  ngOnInit() {
      this.scrollToBottom();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
      } catch (err) { }
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.fid = this.user[0];
    console.log(this.fid);
    this.getUserMessages();
  }

  getUserMessages() {
    this.http.get(`${this.service.twfUrl}/get-user-message/${this.fid}`).subscribe(resp => {
      if (resp !== null) {
        // console.log(resp);
        this.getAllUserMessage = resp;
        // console.log(this.getAllUserMessage);
      }
    });
  }

  messageData(form: NgForm) {
    // console.log(form.value);
    this.http.post(`${this.service.twfUrl}/save-message`, form.value).subscribe(resp => {
      // console.log(resp);
      this.messageValue = '';
      this.getUserMessages();
    });
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    this.messageValue = `${this.messageValue}${event.emoji.native}`;
    // this.showEmojiPicker = false;
  }

  selectedUser(fid, uid, action) {
    // console.log(fid, uid, action);
    this.http.get(`${this.service.twfUrl}/action-on-chat/${fid}/${uid}/${action}`).subscribe(resp => {
      if (resp !== 0) {
        this.getUserMessages();

        console.log(resp);
      } else {
        this.toastr.error('Failed To Perform Action');
      }
    });
  }
}

