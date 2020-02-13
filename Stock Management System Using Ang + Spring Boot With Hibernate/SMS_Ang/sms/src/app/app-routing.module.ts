import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GetAllProductsComponent } from './get-all-products/get-all-products.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ModifyProductsComponent } from './modify-products/modify-products.component';
import { GetFromCartComponent } from './get-from-cart/get-from-cart.component';


const routes: Routes = [
  {path : 'home', component: HomeComponent},
  {path : 'about', component: AboutComponent},
  {path : 'get-all-products', component: GetAllProductsComponent},
  {path : 'search-products', component: SearchProductsComponent},
  {path : 'add-products', component: AddProductsComponent},
  {path : 'modify-products', component: ModifyProductsComponent},
  {path : 'get-from-cart', component: GetFromCartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
