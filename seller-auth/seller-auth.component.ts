import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { SignUp } from 'src/data-type';
import { ServiceService } from '../Services/service.service';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

showForm = false
authError  :string=''

  constructor(private service: ServiceService, private router: Router) {

  }

  // ngOnInIt(): void {
  //   this.service.reloadSeller()
  // }
   ngOnInit(): void {
    this.service.reloadSeller()
  }
  // loginForm = new FormGroup <SignUp>   ({
  //   name:new FormControl  (),
  //   password: new FormControl  (),
  //   email: new FormControl ()

  // })
openLogin(){
 this.showForm = true
}
showSignUp(){
  this.showForm = false
}

  SignUser(data:SignUp) {
    // console.warn(data)
    return this.service.userSign(data)
  }
loginUser(data:SignUp)
{
  this.authError=''
console.warn(data)
 this.service.userLogin(data)
this.service.isLoginError.subscribe((error)=>{
  if(error){
    this.authError = 'Email Password is incorrect'

  }
})
}

}
