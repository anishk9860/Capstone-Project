import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_interceptor/auth-interceptor';
import { MerchantComponent } from './merchant/merchant.component';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';
import { AddFooditemComponent } from './merchant-home/add-fooditem/add-fooditem.component';
import { EditFooditemComponent } from './merchant-home/edit-fooditem/edit-fooditem.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home/customer-home.component';
import { CustomerLocationComponent } from './customer/customer-location/customer-location/customer-location.component';
import { MerchantFoodListComponent } from './customer/merchant-food-list/merchant-food-list/merchant-food-list.component';
import { CartComponent } from './customer/cart/cart/cart.component';
import { OrderDetailsComponent } from './customer/order-details/order-details/order-details.component';
import { MerchantOrdersComponent } from './merchant-home/merchant-orders/merchant-orders.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { SearchResultComponent } from './customer/search-result/search-result.component';
import { FilterByCuisineComponent } from './customer/filter-by-cuisine/filter-by-cuisine.component';
import { FilterByCuisine1Component } from './customer/filter-by-cuisine1/filter-by-cuisine1.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { CustomerChangeAddressComponent } from './customer/customer-change-address/customer-change-address.component';
import { CustomerChangeEmailComponent } from './customer/customer-change-email/customer-change-email.component';
import { CustomerChangePasswordComponent } from './customer/customer-change-password/customer-change-password.component';
import { SearchResult1Component } from './customer/search-result1/search-result1.component';
import { MerchantProfileComponent } from './merchant-home/merchant-profile/merchant-profile.component';
import { MerchantChangeEmailComponent } from './merchant-home/merchant-change-email/merchant-change-email.component';
import { MerchantChangePasswordComponent } from './merchant-home/merchant-change-password/merchant-change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    MerchantComponent,
    MerchantHomeComponent,
    AddFooditemComponent,
    EditFooditemComponent,
    CustomerHomeComponent,
    CustomerLocationComponent,
    MerchantFoodListComponent,
    CartComponent,
    OrderDetailsComponent,
    MerchantOrdersComponent,
    CustomerOrdersComponent,
    SearchResultComponent,
    FilterByCuisineComponent,
    FilterByCuisine1Component,
    CustomerProfileComponent,
    CustomerChangeAddressComponent,
    CustomerChangeEmailComponent,
    CustomerChangePasswordComponent,
    SearchResult1Component,
    MerchantProfileComponent,
    MerchantChangeEmailComponent,
    MerchantChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
