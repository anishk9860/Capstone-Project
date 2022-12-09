import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/services/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupData !: any;

  constructor(private signupService: SignupService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  isSeller: boolean = false;

  defaultUserType = 'No';

  userType = [
    {id: '1', value: 'Yes'}, 
    {id: '2', value: 'No'}
  ]

  @ViewChild('signupForm') form!: NgForm;

  changeUserType(updatedValue: any,id: any){
    if(updatedValue == 'Yes'){
      this.isSeller = true;
    } else {
      this.isSeller = false;
    }
  }

  createUser() {
    // console.log(this.form.value['firstName']);
    const user = {
      firstName : this.form.value['firstName'],
      lastName : this.form.value['lastName'],
      email : this.form.value['email'],
      password : this.form.value['password'],
      userType : this.form.value['userType'] == 'Yes' ? 4 : 3,
      entityName : this.form.value['entityName']
    }
    

    this.signupService
      .registerUser(user)
      .subscribe((res: any) => {
        this.signupData = res;
        if (this.signupData == null){
          alert(`User with this email already exists!`);
        } else {
          console.log(res);
          alert(`Congratulations! Your account has been created.`);
          this.router.navigate(['login']);
        }
    }, (err) => {
      alert(err.error.message);
    })
    
  }

}
