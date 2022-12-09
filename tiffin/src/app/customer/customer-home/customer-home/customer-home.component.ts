import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { MerchantService } from 'src/services/merchant/merchant.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {

  merchants !: any[]
  cart !: [any]
  cuisines = ['North Indian', 'South Indian', 'Bengali', 'Chinese', 
  'Japanese', 'Middle Eastern', 'European', 'Mexican'];
  cartItemCount : number = 0;
  filterBy : string = 'All';
  filterList = ['', 'All', 'North Indian', 'South Indian', 'Bengali', 'Chinese', 
  'Japanese', 'Middle Eastern', 'European', 'Mexican'];

  constructor(private tokenStorage: TokenStorageService, 
    private customerService: CustomerService, private router: Router, 
    private sanitizer: DomSanitizer, private merchantService: MerchantService) { }

  ngOnInit(): void {
    const merchantList = this.tokenStorage.getMerchantListByLocation();
    if(merchantList !== null) {
      for(let i=0; i<merchantList.length; i++){
        if(merchantList[i].merchantPic !== null){
          merchantList[i].merchantPic = this.merchantService
            .createImageFromBlob(merchantList[i].merchantPic);
        }
      }
      this.merchants = merchantList;
    }
    
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

    console.log(this.merchants);
  }

  applyFilter(event:any) {
    if(event.target.value === 'All') {
      return;
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

  goToMyOrders(){
    this.router.navigate(['customer-orders']);
  }

  goToMyProfile() {
    this.router.navigate(['customer-profile']);
  }

}
