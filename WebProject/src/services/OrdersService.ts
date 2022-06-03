import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Order } from 'src/model/Order';
import { TokenService } from './TokenService';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient,
    private tokenService:TokenService) {}

   sendOrder(order:Order): Observable<object> {
    const header = new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ""
      );
      const headers = { headers: header };
     console.log("send order")
    return this.http.post<object>(
      environment.server + '/api/orders/addOrder',order,headers
    );
  }
  getUsersOrders(): Observable<Order[]> {
    const header = new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ""
      );
      let ord:Order=new Order();
      const headers = { headers: header };
     console.log("getting orders by user");
    return this.http.post<Order[]>(
      environment.server + '/api/orders/getUsersOrders',ord,headers
    );
  }
  getDeliverersOrders(): Observable<Order[]> {
    const header = new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ""
      );
      let ord:Order=new Order();
      const headers = { headers: header };
     console.log("getting orders by deliverer");
    return this.http.post<Order[]>(
      environment.server + '/api/orders/getDeliverersOrders',ord,headers
    );
  }
  getAllOrders(): Observable<Order[]> {
    const header = new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ""
      );
      let ord:Order=new Order();
      console.log("token:",localStorage.getItem('token'))
      const headers = { headers: header };
     console.log("getting all orders ");
    return this.http.post<Order[]>(
      environment.server + '/api/orders/getAllOrders',ord,headers
    );
  }
  getNewOrders(): Observable<Order[]> {
    const header = new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ""
      );
      let ord:Order=new Order();
      console.log("token:",localStorage.getItem('token'))
      const headers = { headers: header };
     console.log("getting all orders ");
    return this.http.get<Order[]>(
      environment.server + '/api/orders/getNewOrders',headers
    );
  }
  getActiveOrder(): Observable<Order> {
    const header = new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ""
      );
      let ord:Order=new Order();
      console.log("token:",localStorage.getItem('token'))
      const headers = { headers: header };
     console.log("getting active orders ");
    return this.http.get<Order>(
      environment.server + '/api/orders/getActiveOrder',headers
    );
  }
  startDelivery(order:Order): any {
    if(!this.tokenService.isOccupied())
    {
      const header = new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ""
      );
      const headers = { headers: header };
     console.log("getting orders by deliverer");
    return this.http.post<Order>(
      environment.server + '/api/orders/startDelivery',order,headers
    );
    }
   else
    return null
  }

}
