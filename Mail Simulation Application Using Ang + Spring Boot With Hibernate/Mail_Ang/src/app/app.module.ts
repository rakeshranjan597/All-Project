import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComposeComponent } from './compose/compose.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SentMailComponent } from './sent-mail/sent-mail.component';
import { DeletedComponent } from './deleted/deleted.component';
import { DraftedComponent } from './drafted/drafted.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ComposeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SentMailComponent,
    DeletedComponent,
    DraftedComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
