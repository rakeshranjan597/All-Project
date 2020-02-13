import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './student.service';
import { HomeComponent } from './home/home.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { RequestedBookComponent } from './requested-book/requested-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { GetAllBookComponent } from './get-all-book/get-all-book.component';
import { LibLoginComponent } from './lib-login/lib-login.component';
import { LibRequestedBookComponent } from './lib-requested-book/lib-requested-book.component';
import { AboutComponent } from './about/about.component';
import { ApprovedRejectedBookComponent } from './approved-rejected-book/approved-rejected-book.component';
import { LibGetAllBookComponent } from './lib-get-all-book/lib-get-all-book.component';
import { LibReturnBookComponent } from './lib-return-book/lib-return-book.component';
import { FilterPipe } from './filter.pipe';
import { LibHistoryComponent } from './lib-history/lib-history.component';
import { LibStudProfileComponent } from './lib-stud-profile/lib-stud-profile.component';
import { BookFilterPipe } from './book-filter.pipe';
import { StudentFilterPipe } from './student-filter.pipe';
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginAllComponent } from './login-all/login-all.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SearchBookComponent,
    RequestedBookComponent,
    AddBookComponent,
    GetAllBookComponent,
    LibLoginComponent,
    LibRequestedBookComponent,
    AboutComponent,
    ApprovedRejectedBookComponent,
    LibGetAllBookComponent,
    LibReturnBookComponent,
    FilterPipe,
    LibHistoryComponent,
    LibStudProfileComponent,
    BookFilterPipe,
    StudentFilterPipe,
    LoginAllComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
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
