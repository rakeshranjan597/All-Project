import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {MatTooltipModule} from '@angular/material/tooltip';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { GetAllUsersComponent } from './get-all-users/get-all-users.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    GetAllUsersComponent,
    FriendRequestComponent,
    FriendListComponent,
    MessagesListComponent,
    MessagesComponent,
    ProfileMenuComponent,
    ProfileContentComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 2500,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
    }),
    FontAwesomeModule,
    HttpClientModule,
    PickerModule,
    EmojiModule

    // MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
