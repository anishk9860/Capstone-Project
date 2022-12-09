import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  currentUser !: any;
  currentUserInfo !: any;
  currentUserLocation !: any;
  cities = ['North Vancouver', 'West Vancouver', 'Burnaby', 'Richmond', 
  'New Westminster', 'Coquitlam', 'Surrey'];
  cartItemCount : number = 0;

  constructor(private tokenStorage: TokenStorageService, private router: Router, 
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.currentUserInfo = this.tokenStorage.getUserInfo();
    this.currentUserLocation = this.tokenStorage.getUserLocation();
    console.log(this.currentUser);
    console.log(this.currentUserInfo);
    console.log(this.currentUserLocation);

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
  }

  changeAddress() {
    this.router.navigate(['customer-change-address']);
  }

  changePassword() {
    this.router.navigate(['customer-change-password']);
  }

  changeEmail() {
    this.router.navigate(['customer-change-email']);
  }

  goToCart(){
    this.router.navigate(['customer-cart']);
  }

  goToCustomerHome() {
    this.router.navigate(['customer-home']);
  }

  goToMyOrders() {
    this.router.navigate(['customer-orders']);
  }

}
