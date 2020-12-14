import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product = new Subject<Product>();

  constructor() {
   }

   addToCart(product:Product){
    // console.log('product:',product)
    let allProducts = [];

    if(localStorage.getItem('allProducts')!=null){
      // Retrieve the object from storage
      allProducts = JSON.parse(localStorage.getItem('allProducts'))
    }

    allProducts.push(product);

    // Put the object into storage
    localStorage.setItem('allProducts', JSON.stringify(allProducts));

    this.product.next(product);
   }

}
