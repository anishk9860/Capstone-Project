import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-add-fooditem',
  templateUrl: './add-fooditem.component.html',
  styleUrls: ['./add-fooditem.component.scss']
})
export class AddFooditemComponent implements OnInit {

  merchantName!: string;
  userFile!: File;

  cuisines = ['North Indian', 'South Indian', 'Bengali', 'Chinese', 
            'Japanese', 'Middle Eastern', 'European', 'Mexican'];

  @ViewChild('foodItemForm') form!: NgForm;

  constructor(private tokenStorage: TokenStorageService, 
    private merchantService: MerchantService, private router: Router) { }

  ngOnInit(): void {
    this.merchantName = this.tokenStorage.getUser().entityName;
  }

  onSelectFile(event: any){
    const file = event.target.files[0];
    this.userFile = file;
    console.log(this.userFile);
  }

  saveFoodItem(){
    console.log(this.form.value);
    const foodItemDetails = {
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
    console.log(formData.get('user'));
    this.merchantService
    .saveFoodItemDetails(formData)
    .subscribe((res: any) => {
      this.tokenStorage.saveMerchantFoodItems(res);
      this.router.navigate(['merchant-home']);
    });
  }

  cancelClicked(){
    this.router.navigate(['merchant-home']);
    setTimeout(() => location.reload(), 100);
  }

}
