import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/model/Order';
import { OrdersService } from 'src/services/OrdersService';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TokenService } from 'src/services/TokenService';
@Component({
  selector: 'app-active-order',
  templateUrl: './active-order.component.html',
  styleUrls: ['./active-order.component.css']
})
export class ActiveOrderComponent implements OnInit {
 order :Order=new Order();
 error:string='';
 minutes:number=0;
 seconds:number=0;
  constructor(
    private ordersService:OrdersService,
    private router:Router,
    private navbar:NavBarComponent,
    private tokenService:TokenService,

  ) { }
startTimer()
{
  let interval = setInterval(() => {
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      if (this.minutes === 0 && this.seconds === 0) {
        clearInterval(interval);
        this.navbar.changeUserRole();
        this.tokenService.endDelivery();
        localStorage.removeItem('active');
        this.router.navigateByUrl('/products');
      } else {
        this.seconds = 59;
        this.minutes--;
      }
    }
  }, 1000);
}
getMinutes(now:string)
{
  const myArray = now.split(':');
  const min = myArray[1];
  const sek = myArray[2].split('.')[0];
  console.log('min:',min);
  return Number(min);
}
getSeconds(now:string)
{
  const myArray = now.split(':');
  const sek = myArray[2].split('.')[0];
  return Number(sek);
}
  ngOnInit(): void {
    this.ordersService.getActiveOrder().subscribe(
      (data:Order)=>{
        if(data!=null)
        {
          this.tokenService.startDelivery();
           this.order=data;
          let now=new Date();
          let then:Date=this.order.started as Date;
           console.log("now:",now.toLocaleString());//5/25/2022, 11:13:23 PM

           console.log("started:",then.toLocaleString());//2022-05-25T23:11:12.691589
          // let pom
          
          //    pom=then;
          //   pom.setMinutes(then.getMinutes()+this.order.deliveryTime);
          
         
          // if(now>pom)//znaci da je proslo vreme dostave
          // {
          //     this.router.navigate(['/products']);
          // }
          // else
          // {
          //   if(now.getMinutes()>then.getMinutes())
          //   {
          //     this.minutes=now.getMinutes()-then.getMinutes();
          //     if(now.getSeconds()>then.getSeconds())
          //     {
          //       this.seconds=now.getSeconds()-then.getSeconds();
          //     }
          //     else
          //     {
          //       this.seconds=60-then.getSeconds()+now.getSeconds();
          //     }
          //     this.seconds=60-this.seconds;
          //   }
          //   else
          //   {
          //     this.minutes=60-then.getMinutes()+now.getMinutes();
              
          //   }
          //   this.minutes=this.order.deliveryTime-this.minutes-1;
          
          // }
          //console.log('now-start=',now.getMinutes()-then.getMinutes());
          if(now.getMinutes()>this.getMinutes(then.toLocaleString()))//do 60 oba
          {
            this.minutes=this.order.deliveryTime-(now.getMinutes()-this.getMinutes(then.toLocaleString()))-1;
          }
          else if(now.getMinutes()==this.getMinutes(then.toLocaleString()))
          {
              this.minutes=this.order.deliveryTime-1;
          }
          else//sada je novi sat
          {
              this.minutes=this.order.deliveryTime-(60-this.getMinutes(then.toLocaleString())+now.getMinutes())-1;
          }
         // this.minutes=this.order.deliveryTime-1;
         if(now.getSeconds()>this.getSeconds(then.toLocaleString()))
         {
           this.seconds=59-(now.getSeconds()-this.getSeconds(then.toLocaleString()));
         }
         else if(now.getSeconds()<this.getSeconds(then.toLocaleString()))
         {
           this.seconds=59-(60-this.getSeconds(then.toLocaleString())+now.getSeconds());
         }
         else
         {
          this.seconds=59;
         }
          
          this.startTimer();
        }
        else
        {
          this.error='No active orders.';
        }
        
        
      },
      (error:any)=>{
        this.error='Something went wrong.';
        console.log(error);
      }
    );
  }

}
