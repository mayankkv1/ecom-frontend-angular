import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean = false
  cartItems = [];
  cartItemsCount:number = 0;
  cartItemsAmount = 0;

  constructor(private authService: AuthService, private productService: ProductService, private router: Router) { 
  }

  ngOnInit(): void {  
    if(localStorage.getItem('allProducts')!=null){
      // Retrieve the object from storage
      let allPrds = JSON.parse(localStorage.getItem('allProducts'))
      allPrds.forEach(element => {
        this.cartItems.push(element)
        this.cartItemsCount++;
        this.cartItemsAmount += element.currentPrice;  
      });
    }
 
    this.authService.currentUserSubjectValue.subscribe((res)=>{
      // console.log('subject val:',res)
      this.isLoggedIn = res!=null?true:false
    })

    this.productService.product.subscribe((res:Product)=>{
      // console.log('prd:',res)

      this.cartItems.push(res)
      this.cartItemsCount++;
      this.cartItemsAmount += res.currentPrice;
    })
  }

  logout(){
    this.authService.logout().subscribe((res)=>{
             // remove user from local storage to log user out
             localStorage.removeItem('currentUser');
             this.authService.currentUserSubject.next(null);
             this.router.navigate(['/login']);      
    });
  }


}
