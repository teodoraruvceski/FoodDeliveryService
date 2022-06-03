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
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  error=''
 products: Product[]=[];
 order : Order=new Order();


 deliveryForm = new FormGroup({
  address: new FormControl('', Validators.required),
  comment: new FormControl('', Validators.required),
 });

  constructor(private service:ProductsService,
    private ordersService:OrdersService,
    private route:Router) {
    this.service.getProducts().subscribe(
      (data)=>{
        console.log(data);
        console.log(this.products)
        this.products=data
      },
      (error)=>{
        this.error='Something went wrong.';
      }
    );

   }
  ngOnInit(): void {
  }
AddToOrder(id:number)
{
  let product=this.products.find(p => p.id == id);
  let exists
  exists=this.order.items.find(i=>i.name==product?.name);
  if(exists!=null)
  {
    for (let i = 0; i < this.order.items.length; i++)
    {
      if(this.order.items[i].name==product?.name)
      {
        this.order.items[i].quantity++;
        this.order.price+=this.order.items[i].price;
        break;
      }
    }
  }else
  {
    
    let orderItem:OrderItem=new OrderItem();
    orderItem.ingredients=product?.ingredients || "";
    orderItem.name=product?.name||"";
    orderItem.price=product?.price||0;
    orderItem.quantity=1;
    this.order.items[this.order.items.length]=orderItem;
    this.order.price+=orderItem.price;
  }
  
  
}
Remove(name:String)
{
  for(let i=0;i<this.order.items.length;i++)
  {
    if(this.order.items[i].name==name)
    {
      this.order.items.splice(i,1);
      break;
    }
  }
}
ConfirmOrder()
{
  console.log("sending order");
  if(this.deliveryForm.valid && this.order.items.length!=0)
  {
    this.order.comment=this.deliveryForm.controls["comment"].value;
    this.order.deliveryAddress=this.deliveryForm.controls["address"].value;
    this.order.created=new Date();
    this.error="";
    console.log(this.order)
     this.ordersService.sendOrder(this.order).subscribe(
      (data)=>{
        console.log('data:',data);
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