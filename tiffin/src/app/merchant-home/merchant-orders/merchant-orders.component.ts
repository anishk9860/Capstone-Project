import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-merchant-orders',
  templateUrl: './merchant-orders.component.html',
  styleUrls: ['./merchant-orders.component.scss']
})
export class MerchantOrdersComponent implements OnInit {

  orderDetailsList : any;
  orderListLength !: number;
  count = 0;
  itemsOrdered : any[] = [];
  selectedDeliveryChoice !: string;
  selectedOrder !: any;
  pickUpOptions = ['Pending', 'Order Accepted', 'Preparing', 'Prepared', 'Ready For Pickup', 
    'Cancelled'];

  deliveryOptions = ['Pending', 'Order Accepted', 'Preparing', 'Prepared', 'Delivering', 
    'Delivered', 'Cancelled'];

  constructor(private merchantService: MerchantService, 
    private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    const merchantId = this.tokenStorage.getMerchantInfo().merchantId;
    this.merchantService
    .getAllMerchantTransactions(merchantId)
    .subscribe((res:any) => {
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
  }

  updateOrderStatus(event : any) {
    const changeStatusRequest = {
      transactionId : this.selectedOrder.transactionId,
      statusSelected : event.target.value
    }
    console.log(changeStatusRequest);
    this.merchantService
      .updateOrderStatus(changeStatusRequest)
      .subscribe((res : any) => {
        console.log(res);
        window.location.reload();
      })
      
  }

  getTransaction(order : any) {
    this.selectedOrder = order;
  }

  goToMerchantHome() {
    this.router.navigate(['merchant-home']);
  }

}
