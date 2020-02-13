import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private service: AuthServiceService, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addProduct(form: NgForm) {
    console.log(form.value);
    this.http.post(`${this.service.smaURL}/add-products`, form.value).subscribe(resp => {
      if (resp === true) {
        this.toastr.success('Product Successfully Added!!!');
      } else {
        this.toastr.error('Failed to App the Product');
      }
    });
  }

}
