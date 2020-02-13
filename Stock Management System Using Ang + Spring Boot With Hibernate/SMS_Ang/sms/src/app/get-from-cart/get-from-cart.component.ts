import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-from-cart',
  templateUrl: './get-from-cart.component.html',
  styleUrls: ['./get-from-cart.component.css']
})
export class GetFromCartComponent implements OnInit {

  getAllFromCart;
  getAllCart;
  constructor(private http: HttpClient, private service: AuthServiceService, private toastr: ToastrService) {
    this.getAllFromCart = this.getFromCart();
    // console.log(this.getFromCart());
  }

  ngOnInit() {
  }

  getFromCart() {
    this.http.get(`${this.service.smaURL}/get-from-cart`).subscribe( resp => {
      if (resp !== null) {
        this.getAllCart = resp;
        console.log(resp);
      } else {
        this.toastr.error('Cart Empty');
      }
    });
  }

}
