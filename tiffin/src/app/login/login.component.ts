// import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login/login.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginData: any = null;

  isLoggedIn = false;
  errorMessage = '';
  userType: string = '';

  constructor(private loginService: LoginService, private router: Router, 
    private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
  }

  @ViewChild('loginForm') form!: NgForm;

  loginUser() {;
    const userLoginDetails = {
      email : this.form.value['email'],
      password : this.form.value['password']
    }
    this.loginService
      .authenticateLogin(userLoginDetails)
      .subscribe((res: any) => {
        this.loginData = res;
        console.log(this.loginData);

        if (this.loginData !== null) {
          this.tokenStorage.saveToken(res.accessToken);
          this.tokenStorage.saveUserLocation(res.location);
          this.tokenStorage.saveMerchantInfo(res.merchant);
          this.tokenStorage.saveUserInfo(res.userInfo);
          if(res.roles[0] === 'ROLE_CUSTOMER'){
            this.tokenStorage.saveFoodItems(res.customerFoodItemList);
            this.tokenStorage.saveMerchantListByLocation(res.merchantList);
          } else {
            this.tokenStorage.saveMerchantFoodItems(res.merchantFoodItemList);
          }
          delete(res.location);
          delete(res.merchant);
          delete(res.userInfo);
          delete(res.customerFoodItemList);
          delete(res.merchantFoodItemList);
          console.log(res);
          this.tokenStorage.saveUser(res);
          console.log(this.tokenStorage.getUserLocation());
          this.userType = this.tokenStorage.getUser().roles[0];
          this.isLoggedIn = true;
          alert(`Welcome ${this.loginData.firstName}`);
          if(res.roles[0] === ("ROLE_MERCHANT")){
            if(this.tokenStorage.getUserLocation() !== null) {
              console.log("location exists");
              this.router.navigate(['merchant-home']);
              setTimeout(() => location.reload(), 100);
            } else {
              this.router.navigate(['merchant']);
              setTimeout(() => location.reload(), 100);
            }
            
          } else {
            if(this.tokenStorage.getUserLocation() !== null) {
              console.log("location exists");
              this.router.navigate(['customer-home']);
              setTimeout(() => location.reload(), 100);
            } else {
              this.router.navigate(['customer-location']);
              setTimeout(() => location.reload(), 100);
            }
          }
          
        } 
      }, (err) => {
        alert("Invalid email/password");
      });
  }

}

