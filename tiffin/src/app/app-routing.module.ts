import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './customer/cart/cart/cart.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home/customer-home.component';
import { CustomerLocationComponent } from './customer/customer-location/customer-location/customer-location.component';
import { MerchantFoodListComponent } from './customer/merchant-food-list/merchant-food-list/merchant-food-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddFooditemComponent } from './merchant-home/add-fooditem/add-fooditem.component';
import { EditFooditemComponent } from './merchant-home/edit-fooditem/edit-fooditem.component';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';
import { MerchantComponent } from './merchant/merchant.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'merchant', component: MerchantComponent},
  {path:'customer-location', component: CustomerLocationComponent},
  {path:'customer-home', component: CustomerHomeComponent},
  {path: 'merchant-home', component: MerchantHomeComponent},
  {path: 'add-fooditem', component: AddFooditemComponent},
  {path: 'edit-fooditem', component: EditFooditemComponent},
  {path: 'merchant-food-list', component: MerchantFoodListComponent},
  {path: 'customer-cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, SignupComponent, 
  MerchantComponent, MerchantHomeComponent, AddFooditemComponent, 
  EditFooditemComponent, CustomerLocationComponent, CustomerHomeComponent, 
  MerchantFoodListComponent, CartComponent]
