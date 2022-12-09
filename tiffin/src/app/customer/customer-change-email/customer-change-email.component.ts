import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-customer-change-email',
  templateUrl: './customer-change-email.component.html',
  styleUrls: ['./customer-change-email.component.scss']
})
export class CustomerChangeEmailComponent implements OnInit {

  customerName !: string;
  customerDetail !: any;
  cartItemCount : number = 0;

  constructor(private tokenStorage: TokenStorageService, 
    private customerService: CustomerService, private router: Router) { }
  
  @ViewChild('emailForm') form!: NgForm;

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

  updateEmail() {
    const newEmail = this.form.value['email'];
    const updateEmailDetails = {
      email : this.form.value['email'],
      userId : this.tokenStorage.getUser().id
    }
    this.customerService
      .updateCustomerEmail(updateEmailDetails)
      .subscribe((res:any) => {
        this.tokenStorage.signOut();
        this.router.navigate(['login']);
        setTimeout(() => location.reload(), 100);
        alert("Please sign in again with the new email!");
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
