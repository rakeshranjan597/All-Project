import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GetAllUsersComponent } from './get-all-users/get-all-users.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  {path : 'register', component: RegisterComponent},
  {path : 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path : 'get-all-users', component: GetAllUsersComponent},
  {path : 'friend-request', component: FriendRequestComponent},
  {path : 'friend-list', component: FriendListComponent},
  {path : 'messages-list', component: MessagesListComponent},
  {path : 'profile-menu', component: ProfileMenuComponent},
  {path : 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
