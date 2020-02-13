import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ComposeComponent } from './compose/compose.component';
import { SentMailComponent } from './sent-mail/sent-mail.component';
import { DeletedComponent } from './deleted/deleted.component';
import { DraftedComponent } from './drafted/drafted.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path : 'home', component : HomeComponent},
  {path : 'composer', component: ComposeComponent},
  {path : 'sent-mail', component: SentMailComponent},
  {path : 'delete-mail', component: DeletedComponent},
  {path : 'draft-mail', component: DraftedComponent},
  {path : 'change-password', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
