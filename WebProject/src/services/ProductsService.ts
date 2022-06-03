import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
// import { UserDisplay } from './models/user-display.model';
// import { Login } from './models/login.model';
// import { Token } from './models/token.model';
// import { Registration } from './models/registration.model';
import { Product } from '../model/Product';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

   getProducts(): Observable<Product[]> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') || ""
    );
    console.log("token:",localStorage.getItem('token'))
    const headers = { headers: header };
     console.log("getProducts")
    return this.http.get<Product[]>(
      environment.server + '/api/products/getAllProducts',headers
    );
  }

  addProduct(product:Product): Observable<Product> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') || ""
    );
    const headers = { headers: header };
    console.log("add product: ",product)
   return this.http.post<Product>(
     environment.server + '/api/products/addproduct',product,headers
   );
 }

}
