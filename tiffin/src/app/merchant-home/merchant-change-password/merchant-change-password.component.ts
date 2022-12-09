import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-merchant-change-password',
  templateUrl: './merchant-change-password.component.html',
  styleUrls: ['./merchant-change-password.component.scss']
})
export class MerchantChangePasswordComponent implements OnInit {

  customerName !: string;
  customerDetail !: any;
  cartItemCount : number = 0;

  constructor(private tokenStorage: TokenStorageService, 
    private customerService: CustomerService, private router: Router) { }

  @ViewChild('passwordForm') form!: NgForm;

  ngOnInit(): void {
    this.customerDetail = this.tokenStorage.getUser();
    this.customerName = this.customerDetail.firstName + " " + this.customerDetail.lastName;

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

  goToMyProfile() {
    this.router.navigate(['merchant-profile']);
  }

  goToMyOrders(){
    this.router.navigate(['merchant-orders']);
  }

  goToHomePage() {
    this.router.navigate(['merchant-home']);
  }

  updatePassword() {
    const password = this.form.value['password'];
    const confirmPassword = this.form.value['newPassword'];
    if(password === confirmPassword) {
      const updatePasswordDetails = {
        password : this.form.value['password'],
        userId : this.tokenStorage.getUser().id
      }
      console.log(updatePasswordDetails);
      this.customerService
        .updateCustomerPassword(updatePasswordDetails)
        .subscribe((res:any) => {
          console.log(res);
          alert("Password successfully updated. Please login again!");
          this.tokenStorage.signOut();
          this.router.navigate(['login']);
          setTimeout(() => location.reload(), 100);
        })
    } else {
      alert("Password fields do not match");
      window.location.reload();
    }

  }

}
