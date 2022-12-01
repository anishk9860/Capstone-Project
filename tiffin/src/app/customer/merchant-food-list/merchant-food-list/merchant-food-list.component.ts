import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-merchant-food-list',
  templateUrl: './merchant-food-list.component.html',
  styleUrls: ['./merchant-food-list.component.scss']
})
export class MerchantFoodListComponent implements OnInit {

  merchant !: any;
  foodItems : any = [];
  cart : any = [];
  cartItemCount : number = 0;
  currentMerchantIdInCart : number = 0;

  constructor(private tokenStorage: TokenStorageService, 
    private customerService: CustomerService, private router: Router, 
    private sanitizer: DomSanitizer, private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.merchant = this.tokenStorage.getMerchantInfo();
    // console.log(this.merchant);
    const items = this.tokenStorage.getFoodItems();
    // console.log(items);
    if(items !== null){
      for(let i=0; i<items.length; i++){
        if(items[i].merchantId === this.merchant.merchantId){
          items[i].itemPic = this.merchantService.createImageFromBlob(items[i].itemPic);
          this.foodItems.push(items[i]);
        }
      }
      let totalItems : number = 0;
      let userId = this.tokenStorage.getUser().id;
      this.customerService
        .getCartItems(userId)
        .subscribe((res:any) => {
          if(res.length !== 0){
            for(let i=0; i<res.length; i++){
              totalItems = totalItems + res[i].itemCount;
            }
            this.cartItemCount = totalItems;
            for(let i=0; i<res.length; i++){
              for(let j=0; j<items.length; j++){
                if(res[i].itemId === items[j].itemId) {
                  this.currentMerchantIdInCart = items[j].merchantId;
                  break;
                }
              }
            }
          }
        })
    }
    console.log(this.merchant.merchantId);
    console.log(this.currentMerchantIdInCart);
  }

  getSanitizeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  addItemToCart(foodItem : any){
    if((this.merchant.merchantId === this.currentMerchantIdInCart) || (this.currentMerchantIdInCart === 0)){
      const item = {
        itemId : foodItem.itemId,
        itemCost : foodItem.itemCost,
        itemName : foodItem.itemName,
        itemCount : 1,
        customerId : this.tokenStorage.getUser().id,
      }
      let totalItems : number = 0;
      this.customerService
        .saveItemToCart(item)
        .subscribe((res: any) => {
          console.log(res);
          for(let i=0; i<res.length; i++){
            totalItems = totalItems + res[i].itemCount;
            console.log(res[i].itemCount);
          }
          this.cartItemCount = totalItems;
          console.log(this.cartItemCount);
        })  
    } else {
      alert("You have items from a different merchant in the cart. Please empty the cart to order items from this merchant");
    }

  }

  goToCart(){
    this.router.navigate(['customer-cart']);
  }
  
}
