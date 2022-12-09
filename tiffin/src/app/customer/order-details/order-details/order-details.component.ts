import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  cartItems: any = [];
  totalCost = 0;
  deliveryCost !: number;
  selectedDeliveryChoice : string = 'Pick Up';
  cartItemCount : number = 0;

  dateOfDelivery !: any;
  minDate !: string;
  maxDate  !: string;
  date = new Date();

  currentYear = this.date.getUTCFullYear();
  currentMonth = this.date.getUTCMonth() + 1;
  currentDay = this.date.getUTCDate();

  finalMonth : any;
  finalDay : any;

  constructor(private router: Router, private customerService: CustomerService, 
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    const items = this.tokenStorage.getFoodItems();
    console.log(items);
    // let totalItems : number = 0;
    let userId = this.tokenStorage.getUser().id;
    this.customerService
      .getCartItems(userId)
      .subscribe((res:any) => {
        console.log(res);
        if(res.length === 0){
          return;
        } else {
          for(let i=0; i<res.length; i++){
            for(let j=0; j<items.length; j++){
              if(items[j].itemId === res[i].itemId){
                this.cartItems.push({
                  itemId : items[j].itemId,
                  itemName: items[j].itemName,
                  itemCount : res[i].itemCount,
                  itemCost : items[j].itemCost * res[i].itemCount
                })
                this.totalCost += items[j].itemCost * res[i].itemCount;
                this.deliveryCost = this.totalCost + 5;
              }
            }
            // totalItems = totalItems + res[i].itemCount;
          }
          console.log(this.cartItems);
        }
        
      })

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

      if(this.currentDay < 9){
        this.finalDay = "0" + (this.currentDay + 1);
      } else {
        this.finalDay = this.currentDay + 1;
      }

      if(this.currentMonth < 10){
        this.finalMonth = "0" + this.currentMonth;
      } else {
        this.finalMonth = this.currentMonth;
      }

      this.minDate = this.currentYear + "-" + this.finalMonth + "-" + this.finalDay;

      if(this.finalMonth === 12) {
        let endDay = this.finalDay;
        let endYear = this.currentYear + 1;
        this.maxDate = endYear + "-01" + "-" + endDay; 
      }
  }

  deliveryChoiceSelected(event: any){
    console.log(this.selectedDeliveryChoice);
    this.selectedDeliveryChoice = event.target.value;
    console.log(this.selectedDeliveryChoice);
  }

  dateSelected(event : any) {
    this.dateOfDelivery = event.target.value;
    console.log(this.dateOfDelivery);
  }

  goToCart() {
    this.router.navigate(['customer-cart']);
  }

  goToMyOrders() {
    this.router.navigate(['customer-orders']);
  }

  goToCustomerHome() {
    this.router.navigate(['customer-home'])
  }

  goToMyProfile() {
    this.router.navigate(['customer-profile']);
  }

  confirmAndPay() {

    const orderDetails = {
      merchantId: this.tokenStorage.getMerchantInfo().merchantId,
      customerId: this.tokenStorage.getUser().id,
      deliveryType: this.selectedDeliveryChoice,
      deliveryDate: this.dateOfDelivery,
      transactionItems: this.cartItems,
      totalCost: this.selectedDeliveryChoice === 'Pick Up' ? this.totalCost : this.deliveryCost
    }
    console.log(orderDetails);
    this.customerService
    .postTransaction(orderDetails)
    .subscribe((res:any) => {
      alert("Order Successful!")
      this.router.navigate(['customer-orders']);
    })
  }

}
