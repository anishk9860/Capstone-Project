import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.component.html',
  styleUrls: ['./merchant-profile.component.scss']
})
export class MerchantProfileComponent implements OnInit {

  currentUser !: any;
  currentUserInfo !: any;
  currentUserLocation !: any;
  cities = ['North Vancouver', 'West Vancouver', 'Burnaby', 'Richmond', 
  'New Westminster', 'Coquitlam', 'Surrey'];
  cartItemCount : number = 0;

  constructor(private tokenStorage: TokenStorageService, private router: Router, 
    private customerService: CustomerService, private merchantService: MerchantService) { }

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

  changePassword() {
    this.router.navigate(['merchant-change-password']);
  }

  changeEmail() {
    this.router.navigate(['merchant-change-email']);
  }

  goToMerchantHome() {
    this.router.navigate(['merchant-home']);
  }

  goToMyOrders() {
    this.router.navigate(['merchant-orders']);
  }

}
