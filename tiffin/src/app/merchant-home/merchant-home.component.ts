import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FoodService } from 'src/services/food/food.service';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';
import { FoodItems } from '../shared/models/foodItem';

@Component({
  selector: 'app-merchant-home',
  templateUrl: './merchant-home.component.html',
  styleUrls: ['./merchant-home.component.scss']
})
export class MerchantHomeComponent implements OnInit {

  foods: FoodItems[] = [];
  foodItems !: any;

  constructor(private tokenStorage: TokenStorageService, 
    private merchantService: MerchantService, private foodItem: FoodService, 
    private router: Router, private sanitizer: DomSanitizer) {
     }

  ngOnInit(): void {
    // console.log(window.sessionStorage);
    // console.log(this.tokenStorage.getMerchantFoodItems());
    // console.log(this.tokenStorage.getMerchantFoodItems().length);
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
    // this.foods = this.foodItem.getAll();
    // this.foodItems = this.tokenStorage.getMerchantFoodItems();
  }

  addFoodItem(){
    this.router.navigate(['add-fooditem']);
  }

  deleteFoodItem(itemId: number){
    console.log(itemId);
    this.merchantService
      .deleteFoodItem(itemId)
      .subscribe((res: any) => {
        console.log(res);
        this.tokenStorage.saveMerchantFoodItems(res);
        window.location.reload();
      });
  }

  editFoodItem(foodItemDetails: any) {
    this.merchantService.setEditFoodItemDetails(foodItemDetails);
    this.router.navigate(['edit-fooditem']);
    // this.merchantService
    //   .editFoodItem(itemId)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     this.tokenStorage.saveMerchantFoodItems(res);
    //     window.location.reload();
    //   });
  }

  getSanitizeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
