import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/ProductsService';
import { Order } from 'src/model/Order';
import { OrdersService } from 'src/services/OrdersService';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/TokenService';
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  error=''
  orders: Order[]=[];
  role:string='';
 //order : Order=new Order();
 constructor(private service:ProductsService,
  private ordersService:OrdersService,
  private route:Router,
  private tokenService:TokenService)
  {
   
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null)
    {
      var role =this.tokenService.getUserRole().toString();
      this.role=role;
      console.log("role:",role)
      if(role=='admin')
        {
          this.ordersService.getAllOrders().subscribe(
            (data)=>{
              console.log('alllOrders:',data);
              this.orders=data;
            },
            (error)=>{
              this.error='Something went wrong.';
              console.log(error);
            }
          );
        }
        
      else if(role=='guest')
      {
        this.ordersService.getUsersOrders().subscribe(
          (data)=>{
            console.log('usersorders:',data);
            this.orders=data;
          },
          (error)=>{
            this.error='Something went wrong.';
            console.log(error);
          }
        );
      }
      
      else if(role=='deliverer')
      {
        this.ordersService.getDeliverersOrders().subscribe(
          (data:Order[])=>{
            console.log('usersorders:',data);
            this.orders=data;
            this.orders.forEach(element => {
              if(element.created.getMinutes()+element.deliveryTime<60)
              {
                let pom:Date=element.created;
                pom.setMinutes(pom.getMinutes()+element.deliveryTime);
                if(pom<new Date())
                {
                  
                }
              }
            });
          },
          (error:any)=>{
            this.error='Something went wrong.';
            console.log(error);
          }
        );
       // this.deliverer2.next(true);
     // this.deliverer=this.deliverer2.asObservable();
      }

    }

  }
   

}
