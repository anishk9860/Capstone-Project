import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {

  merchantName!: string;
  userFile!: File;
  cities = ['North Vancouver', 'West Vancouver', 'Burnaby', 'Richmond', 
    'New Westminster', 'Coquitlam', 'Surrey'];
  cuisines = ['North Indian', 'South Indian', 'Bengali', 'Chinese', 
    'Japanese', 'Middle Eastern', 'European', 'Mexican'];
  

  constructor(private tokenStorage: TokenStorageService, 
    private merchantService: MerchantService, private router: Router) { }

  ngOnInit(): void {
    this.merchantName = this.tokenStorage.getUser().entityName;
    console.log(this.tokenStorage);
  }

  @ViewChild('locationForm') form!: NgForm;

  onSelectFile(event: any){
    const file = event.target.files[0];
    this.userFile = file;
    console.log(this.userFile);
  }

  saveLocationDetails() {

    const merchantDetails = {
      cityName : this.form.value['cityName'],
      streetName : this.form.value['streetName'],
      aptNo : this.form.value['aptNo'],
      zipCode : this.form.value['zipCode'],
      userId : this.tokenStorage.getUser().id,
      cuisineName : this.form.value['cuisineName']
    }
    const formData = new FormData();
    formData.append('user', JSON.stringify(merchantDetails));
    formData.append('file', this.userFile);
    console.log(formData.get('user'));
    console.log(formData.get('file'));
    this.merchantService
      .saveDetails(formData)
      .subscribe((res: any) => {
        console.log(res);
        // this.tokenStorage.saveUserLocation(res);
        this.tokenStorage.saveUserLocation(res.location);
        this.tokenStorage.saveUserInfo(res.userInfo);
        this.tokenStorage.saveMerchantInfo(res.merchant);
        this.router.navigate(['merchant-home']);
      });
  }

}
