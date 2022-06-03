import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/ProductsService';
import { Product } from 'src/model/Product';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 error=''
 products: Product[]=[]
  constructor(private service:ProductsService,
    private navBar: NavBarComponent) {
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
    this.navBar.changeUserRole();
  }

}
