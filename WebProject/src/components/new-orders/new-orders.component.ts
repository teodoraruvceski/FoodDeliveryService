import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/ProductsService';
import { Order } from 'src/model/Order';
import { OrdersService } from 'src/services/OrdersService';
import { User } from 'src/model/User';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/TokenService';
@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {
  orders:Order[]=[];
  error:string='';
  constructor(
    private service:ProductsService,
  private ordersService:OrdersService,
  private route:Router,
  private tokenService:TokenService
  ) { }

  ngOnInit(): void {
    this.ordersService.getNewOrders().subscribe(
      (data:Order[])=>{
        console.log('usersorders:',data);
        this.orders=data;
      },
      (error:any)=>{
        this.error='Something went wrong.';
        console.log(error);
      }
    );
  }
 onStartDelivery(id:number)
 {
    let o:Order=new Order();
    o.id=id;
    o.state=1;
    this.ordersService.startDelivery(o).subscribe
    (
      (data:Object)=>{
        console.log('data:',data);
        if(data!=null)
        {
          this.tokenService.startDelivery();
        localStorage.setItem("active","true");
          this.route.navigate(['/activeorder']);
        }
        
      }
    ),
    (error:any)=>
    {

    }
 }
}
