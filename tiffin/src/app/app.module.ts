import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    routingComponents,
    MerchantComponent,
    MerchantHomeComponent,
    AddFooditemComponent,
    EditFooditemComponent,
    CustomerHomeComponent,
    CustomerLocationComponent,
    MerchantFoodListComponent,
    CartComponent
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
