import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './customer/cart/cart/cart.component';
import { CustomerChangeAddressComponent } from './customer/customer-change-address/customer-change-address.component';
import { CustomerChangeEmailComponent } from './customer/customer-change-email/customer-change-email.component';
import { CustomerChangePasswordComponent } from './customer/customer-change-password/customer-change-password.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home/customer-home.component';
import { CustomerLocationComponent } from './customer/customer-location/customer-location/customer-location.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { FilterByCuisineComponent } from './customer/filter-by-cuisine/filter-by-cuisine.component';
import { FilterByCuisine1Component } from './customer/filter-by-cuisine1/filter-by-cuisine1.component';
import { MerchantFoodListComponent } from './customer/merchant-food-list/merchant-food-list/merchant-food-list.component';
import { OrderDetailsComponent } from './customer/order-details/order-details/order-details.component';
import { SearchResultComponent } from './customer/search-result/search-result.component';
import { SearchResult1Component } from './customer/search-result1/search-result1.component';
import { LoginComponent } from './login/login.component';
import { AddFooditemComponent } from './merchant-home/add-fooditem/add-fooditem.component';
import { EditFooditemComponent } from './merchant-home/edit-fooditem/edit-fooditem.component';
import { MerchantChangeEmailComponent } from './merchant-home/merchant-change-email/merchant-change-email.component';
import { MerchantChangePasswordComponent } from './merchant-home/merchant-change-password/merchant-change-password.component';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';
import { MerchantOrdersComponent } from './merchant-home/merchant-orders/merchant-orders.component';
import { MerchantProfileComponent } from './merchant-home/merchant-profile/merchant-profile.component';
import { MerchantComponent } from './merchant/merchant.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'merchant', component: MerchantComponent},
  {path:'customer-location', component: CustomerLocationComponent},
  {path:'customer-home', component: CustomerHomeComponent},
  {path: 'merchant-home', component: MerchantHomeComponent},
  {path: 'add-fooditem', component: AddFooditemComponent},
  {path: 'edit-fooditem', component: EditFooditemComponent},
  {path: 'filter-by-cuisine1', component: FilterByCuisine1Component},
  {path: 'merchant-food-list', component: MerchantFoodListComponent},
  {path: 'customer-cart', component: CartComponent},
  {path: 'order-details', component: OrderDetailsComponent},
  {path: 'merchant-orders', component: MerchantOrdersComponent},
  {path: 'customer-orders', component: CustomerOrdersComponent},
  {path: 'search-result', component: SearchResultComponent},
  {path: 'filter-by-cuisine', component: FilterByCuisineComponent},
  {path: 'customer-profile', component: CustomerProfileComponent},
  {path: 'customer-change-address', component: CustomerChangeAddressComponent},
  {path: 'customer-change-email', component: CustomerChangeEmailComponent},
  {path: 'customer-change-password', component: CustomerChangePasswordComponent},
  {path: 'search-result1', component : SearchResult1Component},
  {path: 'merchant-profile', component : MerchantProfileComponent},
  {path: 'merchant-change-email', component: MerchantChangeEmailComponent},
  {path: 'merchant-change-password', component: MerchantChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, SignupComponent, 
  MerchantComponent, MerchantHomeComponent, FilterByCuisine1Component, AddFooditemComponent, 
  EditFooditemComponent, CustomerLocationComponent, CustomerHomeComponent, 
  MerchantFoodListComponent, CartComponent, OrderDetailsComponent, MerchantOrdersComponent, 
  CustomerOrdersComponent, SearchResultComponent, FilterByCuisineComponent, CustomerProfileComponent, 
  CustomerChangeAddressComponent, CustomerChangeEmailComponent, CustomerChangePasswordComponent, 
  SearchResult1Component, MerchantProfileComponent, MerchantChangeEmailComponent, 
  MerchantChangePasswordComponent]
