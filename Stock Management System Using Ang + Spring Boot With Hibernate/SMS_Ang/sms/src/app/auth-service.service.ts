import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public smaURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(`${this.smaURL}/get-all-products`).pipe(
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

  // addProduct(data: NgForm) {
  //   console.log('service:', data.value);
  //   return this.http.post(`${this.smaURL}/add-products`, data.value);
  // }


}
