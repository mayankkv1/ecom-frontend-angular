import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.products = [{id:1,
      title:'book 1',
      image:'2100000261819.jpg',
      originalPrice:100,
      currentPrice:80},{id:2,
        title:'book 2',
        image:'9780008424107.jpg',
        originalPrice:200,
        currentPrice:150},{id:3,
          title:'book 3',
          image:'9780008297152.jpg',
          originalPrice:400,
          currentPrice:380}];
  }

  addToCart(product:Product){
    this.productService.addToCart(product);
  }

  

}
