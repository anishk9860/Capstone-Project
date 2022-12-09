import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-merchant-home',
  templateUrl: './merchant-home.component.html',
  styleUrls: ['./merchant-home.component.scss']
})
export class MerchantHomeComponent implements OnInit {

  foodItems !: any;

  constructor(private tokenStorage: TokenStorageService, 
    private merchantService: MerchantService, 
    private router: Router, private sanitizer: DomSanitizer) {
     }

  ngOnInit(): void {
    const items =  this.tokenStorage.getMerchantFoodItems();
    console.log(items);
    if(items !== null){
      for(let i=0; i<items.length; i++){
        if(items[i].itemPic !== null){
          items[i].itemPic = this.merchantService.createImageFromBlob(items[i].itemPic);
        }
      }
    }

    console.log(items);
    this.foodItems = items;
    console.log(this.tokenStorage.getMerchantInfo())
  }

  addFoodItem(){
    this.router.navigate(['add-fooditem']);
  }

  deleteFoodItem(itemId: number){
    console.log(itemId);
    const result = confirm('Are you sure you want to delete this item?');
    if(!!result) {
      this.merchantService
      .deleteFoodItem(itemId)
      .subscribe((res: any) => {
        console.log(res);
        this.tokenStorage.saveMerchantFoodItems(res);
        window.location.reload();
      });
    }
  }

  editFoodItem(foodItemDetails: any) {
    this.merchantService.setEditFoodItemDetails(foodItemDetails);
    this.router.navigate(['edit-fooditem']);
  }

  getSanitizeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToMerchantOrders() {
    this.router.navigate(['merchant-orders']);
  }

  goToMyProfile() {
    this.router.navigate(['merchant-profile']);
  }

}
