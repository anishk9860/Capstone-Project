import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-edit-fooditem',
  templateUrl: './edit-fooditem.component.html',
  styleUrls: ['./edit-fooditem.component.scss']
})
export class EditFooditemComponent implements OnInit {

  merchantName!: string;
  itemToBeEdited!: any;
  userFile!: File;

  cuisines = ['North Indian', 'South Indian', 'Bengali', 'Chinese', 
            'Japanese', 'Middle Eastern', 'European', 'Mexican'];

  constructor(private tokenStorage: TokenStorageService, 
    private merchantService: MerchantService, private router: Router) { }

  @ViewChild('foodItemForm') form!: NgForm;

  ngOnInit(): void {
    this.merchantName = this.tokenStorage.getUser().entityName;
    this.itemToBeEdited = this.merchantService.getEditFoodItemDetails();
    console.log(this.itemToBeEdited);
  }

  editFoodItem(){
    console.log(this.form.value);
    const foodItemDetails = {
      itemId : this.itemToBeEdited.itemId,
      merchantId : this.tokenStorage.getMerchantInfo().merchantId,
      userId : this.tokenStorage.getUser().id,
      itemName : this.form.value['itemName'],
      itemCost : this.form.value['itemCost'],
      cuisineName : this.cuisines[(this.tokenStorage.getMerchantInfo().cuisineId)-1]
    }
    console.log(foodItemDetails);
    const formData = new FormData();
    formData.append('user', JSON.stringify(foodItemDetails));
    formData.append('file', this.userFile);
    this.merchantService
      .editFoodItem(formData)
      .subscribe((res: any) => {
        console.log(res);
        this.tokenStorage.saveMerchantFoodItems(res);
        this.router.navigate(['merchant-home']);
      });
    // this.merchantService
    //   .editFoodItem(foodItemDetails)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     this.tokenStorage.saveMerchantFoodItems(res);
    //     // this.tokenStorage.getUser().itemList = res;
    //     this.router.navigate(['merchant-home']);
    //   });
  }

  cancelClicked(){
    this.router.navigate(['merchant-home']);
    setTimeout(() => location.reload(), 100);
  }

  onSelectFile(event: any){
    const file = event.target.files[0];
    this.userFile = file;
    console.log(this.userFile);
  }

}
