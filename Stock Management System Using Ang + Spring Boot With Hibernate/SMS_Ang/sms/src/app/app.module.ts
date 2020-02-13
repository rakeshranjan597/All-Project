import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetAllProductsComponent } from './get-all-products/get-all-products.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ModifyProductsComponent } from './modify-products/modify-products.component';
import { SearchProductPipe } from './search-product.pipe';
import { GetFromCartComponent } from './get-from-cart/get-from-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    GetAllProductsComponent,
    SearchProductsComponent,
    AddProductsComponent,
    ModifyProductsComponent,
    SearchProductPipe,
    GetFromCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 2500,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
