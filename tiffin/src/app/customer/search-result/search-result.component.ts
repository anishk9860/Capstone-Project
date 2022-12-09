import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  merchant !: any;
  foodItems : any = [];
  foodItemsLength : number = 0;
  cart : any = [];
  cartItemCount : number = 0;
  currentMerchantIdInCart : number = 0;
  cuisines = ['North Indian', 'South Indian', 'Bengali', 'Chinese', 
  'Japanese', 'Middle Eastern', 'European', 'Mexican'];

  constructor(private tokenStorage: TokenStorageService, 
    private customerService: CustomerService, private router: Router, 
    private sanitizer: DomSanitizer, private merchantService: MerchantService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getMerchantInfo());
    this.merchant = this.tokenStorage.getMerchantInfo();
    console.log(this.merchant);
    const items = this.tokenStorage.getFoodItems();
    console.log(items);
    const merchantList = this.tokenStorage.getMerchantListByLocation();
    if(items !== null){
      for(let i=0; i<items.length; i++){
        if(!!this.customerService.getSearchedText()){
          let searchedText = this.customerService.getSearchedText().toLowerCase();
          let currentItemName = items[i].itemName.toLowerCase();
          if(currentItemName.includes(searchedText)){
            items[i].itemPic = this.merchantService.createImageFromBlob(items[i].itemPic);
            for(let j=0; j<merchantList.length; j++){
              let newItem !: Object;
              if(merchantList[j].merchantId === items[i].merchantId){
                newItem = {
                  itemName : items[i].itemName,
                  itemId : items[i].itemId,
                  cityLocationId : items[i].cityLocationId,
                  cuisineId : items[i].cuisineId,
                  itemCost : items[i].itemCost,
                  itemPic : items[i].itemPic,
                  merchantId : items[i].merchantId,
                  merchantName : merchantList[j].merchantName
                }
                console.log(newItem);
                this.foodItems.push(newItem);
                console.log(this.foodItems);
                this.foodItemsLength++;
                break;
              }
            }
          }
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
  }

  getSanitizeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  addItemToCart(foodItem : any){
    if((foodItem.merchantId === this.currentMerchantIdInCart) || (this.currentMerchantIdInCart === 0)){
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
          alert("Item successfully added to cart!");
        })  
    } else {
      alert("You have items from a different merchant in the cart. Please empty the cart to order items from this merchant");
    }

  }

  goToCart(){
    this.router.navigate(['customer-cart']);
  }

  goToMyOrders() {
    this.router.navigate(['customer-orders']);
  }

  goToMyProfile() {
    this.router.navigate(['customer-profile']);
  }

  goToHomePage() {
    this.router.navigate(['customer-home']);
    setTimeout(() => location.reload(), 100);
  }

}
