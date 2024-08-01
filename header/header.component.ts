import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 menuType: String = 'default'
 sellerName:string=''
  constructor(private route:Router){

    
  } 
  ngOnInit(): void {
   
    this.route.events.subscribe((val:any)=>{
       if(val.url){
        console.warn(val.url)
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.warn('In seller area')
          this.menuType = 'seller'

          let sellerStorage = localStorage.getItem('seller');
          let sellerData = sellerStorage && JSON.parse(sellerStorage)[0];
          this.sellerName =sellerData.name
        }
        else{
          console.warn('Outside Seller area')
          this.menuType = 'default'
        }
       }
    }  )

  }
  logOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  
  }


