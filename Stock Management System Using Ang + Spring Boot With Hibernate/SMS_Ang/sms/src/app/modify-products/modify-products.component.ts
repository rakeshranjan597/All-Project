import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modify-products',
  templateUrl: './modify-products.component.html',
  styleUrls: ['./modify-products.component.css']
})
export class ModifyProductsComponent implements OnInit {

  getAllProducts;
  getProductByIdValue;

  constructor(private service: AuthServiceService, private toastr: ToastrService, private http: HttpClient) {
    this.getTotalProduct();
   }

  ngOnInit() {
  }

  getTotalProduct() {
    this.service.getAllProducts().subscribe(resp => {
      if (resp !== null) {
        this.getAllProducts = resp;
      } else {
        this.toastr.error('Products Not Available');
      }
    });
  }

  getProductById(pid) {
    console.log(pid);
    this.http.get(`${this.service.smaURL}/get-product-by-id/${pid}`).subscribe(resp => {
      if (resp !== null) {
        this.getProductByIdValue = Array.of(resp);
        console.log(this.getProductByIdValue);
      } else {
        this.toastr.error('SomeThing Went Wrong');
      }
    });
  }

  modifyProduct(form: NgForm) {
    console.log(form.value);
    this.http.put(`${this.service.smaURL}/modify-product`, form.value).subscribe(resp => {
      if (resp === true) {
        this.getTotalProduct();
        this.toastr.success('Successfully Modified');
      } else {
        this.toastr.error('Failed To Modify');
      }
    });
  }

}
