import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-customer-change-address',
  templateUrl: './customer-change-address.component.html',
  styleUrls: ['./customer-change-address.component.scss']
})
export class CustomerChangeAddressComponent implements OnInit {

  customerLocation !: any;
  customerInfo !: any;
  customerName !: string;
  cartItemCount : number = 0;

  cities = ['North Vancouver', 'West Vancouver', 'Burnaby', 'Richmond', 
  'New Westminster', 'Coquitlam', 'Surrey'];

  constructor(private tokenStorage: TokenStorageService, 
    private customerService: CustomerService, private router: Router) { }

  @ViewChild('locationForm') form!: NgForm;

  ngOnInit(): void {
    this.customerInfo = this.tokenStorage.getUserInfo();
    this.customerLocation = this.tokenStorage.getUserLocation();
    this.customerName = this.tokenStorage.getUser().firstName + " " + this.tokenStorage.getUser().lastName;
    console.log(this.customerInfo);
    console.log(this.customerLocation);
  }

  updateLocationDetails() {
    const customerUpdateAddressDetails = {
      cityName : this.form.value['cityName'],
      streetName: this.form.value['streetName'],
      aptNo : this.form.value['aptNo'],
      zipCode : this.form.value['zipCode'],
      userId : this.tokenStorage.getUser().id
    }
    console.log(customerUpdateAddressDetails);

    const items = this.tokenStorage.getFoodItems();
    if(items !== null){
      let totalItems : number = 0;
      let userId = this.tokenStorage.getUser().id;
      this.customerService
        .getCartItems(userId)
        .subscribe((res:any) => {
          for(let i=0; i<res.length; i++){
            totalItems = totalItems + res[i].itemCount;
            console.log(res[i].itemCount);
          }
          this.cartItemCount = totalItems;
        })
    }

    this.customerService
      .updateCustomerAddress(customerUpdateAddressDetails)
      .subscribe((res:any) => {
        console.log(res);
        this.tokenStorage.saveUserLocation(res.location);
        this.tokenStorage.saveUserInfo(res.userInformation);
        this.tokenStorage.saveMerchantInfo(res.merchants);
        this.tokenStorage.saveFoodItems(res.items);
        this.router.navigate(['customer-profile']);
      })
  }

  goToMyProfile() {
    this.router.navigate(['customer-profile']);
  }

  goToCart(){
    this.router.navigate(['customer-cart']);
  }

  goToMyOrders(){
    this.router.navigate(['customer-orders']);
  }

  goToHomePage() {
    this.router.navigate(['customer-home']);
  }

}
