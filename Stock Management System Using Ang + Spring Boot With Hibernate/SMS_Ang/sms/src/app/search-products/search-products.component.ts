import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  getAllProducts;
  constructor(private service: AuthServiceService, private toastr: ToastrService, private http: HttpClient) {
    this.getAllProduct();
   }

  ngOnInit() {
  }

  getAllProduct() {
    this.service.getAllProducts().subscribe(response => {
      if (response !== null) {
        this.getAllProducts = response;
      } else {
        this.toastr.info('Products Not Available');
      }
    });
  }

  addToCart(prod) {
    console.log(prod);
    this.http.post(`${this.service.smaURL}/add-to-cart/`, prod).subscribe(resp => {
      if (resp === true) {
        this.toastr.success('Successfully Added To The Cart');
        this.getAllProduct();
      } else {
        this.toastr.error('Failed to Add In The Cart');
      }
    });
  }

}
