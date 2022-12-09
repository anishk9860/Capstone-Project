import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  orderDetailsList : any;
  orderListLength !: number;
  itemsOrdered : any[] = [];
  cartItemCount : number = 0;

  constructor(private router: Router, private tokenStorage: TokenStorageService, 
    private customerService: CustomerService) { }

  ngOnInit(): void {
    console.log(window.sessionStorage);
    console.log(this.tokenStorage.getUser());
    const customerId = this.tokenStorage.getUser().id;
    this.customerService
      .getAllCustomerTransactions(customerId)
      .subscribe((res:any) => {
        console.log(res);
        this.orderDetailsList = res;
        for(let i=0; i<res.length; i++){
          let transactionItems = [];
          for(let j=0; j<res[i].itemsOrdered.length; j++){
            transactionItems.push(res[i].itemsOrdered[j])
          }
          this.itemsOrdered.push(transactionItems);
        }
        this.orderListLength = this.orderDetailsList.length;
        console.log(this.orderDetailsList);
        console.log(this.itemsOrdered);
      })
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

  goToCustomerHome() {
    this.router.navigate(['customer-home'])
  }

  goToMyAccount() {
    this.router.navigate(['customer-profile']);
  }

  goToCart(){
    this.router.navigate(['customer-cart']);
  }

}
