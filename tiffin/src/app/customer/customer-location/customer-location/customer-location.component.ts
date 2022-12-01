import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer/customer.service';
import { TokenStorageService } from 'src/services/token-storage/token-storage.service';

@Component({
  selector: 'app-customer-location',
  templateUrl: './customer-location.component.html',
  styleUrls: ['./customer-location.component.scss']
})
export class CustomerLocationComponent implements OnInit {

  customerName!: string
  cities = ['North Vancouver', 'West Vancouver', 'Burnaby', 'Richmond', 
            'New Westminster', 'Coquitlam', 'Surrey'];

  constructor(private tokenStorage: TokenStorageService, 
    private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.customerName = this.tokenStorage.getUser().firstName;
    console.log(this.tokenStorage.getUser());
  }

  @ViewChild('locationForm') form!: NgForm;

  saveLocationDetails(locationForm: NgForm) {

    const customerDetails = {
      cityName : this.form.value['cityName'],
      streetName : this.form.value['streetName'],
      aptNo : this.form.value['aptNo'],
      zipCode : this.form.value['zipCode'],
      userId : this.tokenStorage.getUser().id
    }
    console.log(customerDetails);
    this.customerService
      .saveCustomerDetails(customerDetails)
      .subscribe((res: any) => {
        console.log(res);
        // this.tokenStorage.saveUserLocation(res);
        this.tokenStorage.saveUserLocation(res.location);
        this.tokenStorage.saveUserInfo(res.userInformation);
        this.tokenStorage.saveMerchantInfo(res.merchants);
        this.tokenStorage.saveFoodItems(res.items);
        this.router.navigate(['customer-home']);
      });
  }

}
