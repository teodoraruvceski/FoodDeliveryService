import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/ProductsService';
import { Product } from 'src/model/Product';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Order } from 'src/model/Order';
import { OrderItem } from 'src/model/OrderItem';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/services/UsersService';
import { OrdersService } from 'src/services/OrdersService';
import { User } from 'src/model/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  error=''
  constructor(private service:ProductsService,
    private ordersService:OrdersService,
    private route:Router) { }
    productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('',[Validators.required,Validators.min(1)]),
      ingredients: new FormControl('',Validators.required),
     });
  ngOnInit(): void {
  }

  onAdd()
  {
    console.log("adding product");
  if(this.productForm.valid)
  {
    let product:Product=new Product();
    product.name=this.productForm.controls["name"].value;
    product.price=this.productForm.controls["price"].value;
    product.ingredients=this.productForm.controls["ingredients"].value;
    this.error="";
    console.log(product)
     this.service.addProduct(product).subscribe(
      (data)=>{
        console.log('data:',data);
        if(data==null)
          this.error="Product with given name already exists";
        else
          this.route.navigate(["/products"]);
      },
      (error)=>{
        console.log(error);
      }
    );
   
  }
  else
  {
    this.error="Please enter all required information.";
  }
  }

}
