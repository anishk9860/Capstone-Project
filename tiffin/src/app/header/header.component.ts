import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'hinv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name : string = "";
  isLoggedIn: boolean = false;
  searchText : string = "";
  switchSearchPage : boolean = false;

  constructor(private tokenStorage: TokenStorageService, private router: Router, 
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.name = this.tokenStorage.getUser().firstName;
    if(!!this.name){
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false;
    }
  }

  logout(){
    this.tokenStorage.signOut();
    this.router.navigate(['']);
    setTimeout(() => location.reload(), 100);
  }

  goToHomePage() {
    if(this.isLoggedIn){
      let user = this.tokenStorage.getUserInfo();
      if(user.userTypeId === 3){
        this.router.navigate(['customer-home']);
      } else {
        this.router.navigate(['merchant-home']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  goToSearchPage(searchText : string) {
    if(!!searchText){
      if(this.isLoggedIn) {
        let user = this.tokenStorage.getUserInfo();
        if(user.userTypeId === 3){
          this.customerService.setSearchedText(this.searchText);
          if(!this.switchSearchPage) {
            this.switchSearchPage = true;
            this.router.navigate(['search-result']);
          } else {
            this.switchSearchPage = false;
            this.router.navigate(['search-result1']);
          }
          
        }
      }
    }
  }

}
