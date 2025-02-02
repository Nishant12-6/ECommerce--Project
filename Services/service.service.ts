import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp, Login } from 'src/data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)


//   constructor(private http: HttpClient, private router: Router) { }

//   userSign(data: SignUp) {
//     this.http.post(`http://localhost:3000/seller`, data, { observe: 'response' }).subscribe((result) => {
//       this.isSellerLoggedIn.next(true)
//       localStorage.setItem('seller', JSON.stringify(result.body))
//       this.router.navigate(['seller-home'])
//       console.warn(result)

//     })
//   }
//   reloadSeller() {
//     if (localStorage.getItem('seller')) {
//       this.isSellerLoggedIn.next(true)
//       // this.router.navigate(['seller-home'])
//     }
//   }

//   userLogin(data: Login) {
//     this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
//       { observe: 'response' }).subscribe((result: any) => {
//         if (result && result.body && result.body.length) {
//           console.log("User Logged In")
//           this.isSellerLoggedIn.next(true)
//           this.router.navigate(['seller-home'])
//         }
//         else {
//           console.warn("Login Failed")
//           this.isLoginError.emit(true)
//         }
//       })


//   }
// }
constructor(private http:HttpClient, private router:Router) { }
userSign(data:SignUp){
  this.http.post('http://localhost:3000/seller',
  data,
  {observe:'response'}).subscribe((result)=>{
    console.warn(result)
    if(result){
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }
  })
} 
reloadSeller(){
  if(localStorage.getItem('seller')){
    this.isSellerLoggedIn.next(true)
    this.router.navigate(['seller-home'])
  }
}
userLogin(data:Login){
 this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
 {observe:'response'}).subscribe((result:any)=>{
  console.warn(result)
  if(result && result.body && result.body.length===1){
    this.isLoginError.emit(false)
    localStorage.setItem('seller',JSON.stringify(result.body))
    this.router.navigate(['seller-home'])
  }else{
    console.warn("login failed");
    this.isLoginError.emit(true)
  }
 })
}
}

