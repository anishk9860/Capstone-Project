import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-filter-by-cuisine1',
  templateUrl: './filter-by-cuisine1.component.html',
  styleUrls: ['./filter-by-cuisine1.component.scss']
})
export class FilterByCuisine1Component implements OnInit {

  merchants !: any[]
  cart !: [any]
  cuisines = ['North Indian', 'South Indian', 'Bengali', 'Chinese', 
  'Japanese', 'Middle Eastern', 'European', 'Mexican'];
  cartItemCount : number = 0;
  filterBy !: string;
  filterList = ['', 'All', 'North Indian', 'South Indian', 'Bengali', 'Chinese', 
  'Japanese', 'Middle Eastern', 'European', 'Mexican'];

  constructor(private tokenStorage: TokenStorageService, 
    private customerService: CustomerService, private router: Router, 
    private sanitizer: DomSanitizer, private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.filterBy = this.customerService.getSelectedFilter();
    console.log(this.filterBy);
    const filteredMerchantList : any[] = [];
    const merchantList = this.tokenStorage.getMerchantListByLocation();
    if(merchantList !== null) {
      for(let i=0; i<merchantList.length; i++){
        if(this.cuisines[(merchantList[i].cuisineId)-1] === this.filterBy){
          if(merchantList[i].merchantPic !== null) {
            merchantList[i].merchantPic = this.merchantService
            .createImageFromBlob(merchantList[i].merchantPic);
          }
          filteredMerchantList.push(merchantList[i]);
        }       
      }
      this.merchants = filteredMerchantList;
    }
  }

  applyFilter(event:any) {
    if(event.target.value === 'All') {
      this.router.navigate(['customer-home']);
    } else {
      this.customerService.setSelectedFilter(event.target.value);
      this.router.navigate(['filter-by-cuisine']);
    }
  }

  getSanitizeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  merchantClicked(merchant: any){
    this.tokenStorage.saveMerchantInfo(merchant);
    this.router.navigate(['merchant-food-list']);
  }

  goToCart(){
    this.router.navigate(['customer-cart']);
  }

  goToMyProfile() {
    this.router.navigate(['customer-profile']);
  }

  goToMyOrders(){
    this.router.navigate(['customer-orders']);
  }

}
