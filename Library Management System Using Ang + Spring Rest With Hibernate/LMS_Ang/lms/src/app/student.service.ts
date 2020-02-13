import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public lmsURL = 'http://localhost:8080';
  public isStuLoggedIn = false;
  public isLibLoggedIn = false;
  public home = true;

  constructor(private http: HttpClient) { }

  isLibrarianLoggedIn() {
    if (this.isLibLoggedIn) {
      return true;
    }
    return false;
  }

  isStudentLoggedIn() {
    if (this.isStuLoggedIn) {
      return true;
    }
    return false;
  }

  getUsers() {
    return this.http.get(`${this.lmsURL}/get-all-book`).pipe(
      map(data => {
        const newArray = [];
        // tslint:disable-next-line: forin
        for (const key in data) {
          newArray.push({...data[key], id : key});
        }
        return newArray;
      })
    );
  }

}
