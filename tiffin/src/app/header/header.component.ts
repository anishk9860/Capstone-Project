import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'hinv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name : string = "";
  isLoggedIn: boolean = false;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

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

}
