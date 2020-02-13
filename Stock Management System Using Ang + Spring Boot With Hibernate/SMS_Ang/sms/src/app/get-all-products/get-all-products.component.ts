import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-all-products',
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.css']
})
export class GetAllProductsComponent implements OnInit {

  getAllProducts;
  constructor(private service: AuthServiceService, private toastr: ToastrService) {
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
}
