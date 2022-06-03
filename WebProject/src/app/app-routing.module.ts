import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponentComponent } from 'src/components/registration/registration-component/registration-component.component';
import { ProductsComponent } from 'src/components/products/products.component';
import {ProfileComponent} from 'src/components/profile/profile.component';
import { NewOrderComponent } from 'src/components/new-order/new-order.component';
import { AllOrdersComponent } from 'src/components/all-orders/all-orders.component';
import { AddProductComponent } from 'src/components/add-product/add-product.component';
import { VerificationsComponent } from 'src/components/verifications/verifications.component';
import { NewOrdersComponent } from 'src/components/new-orders/new-orders.component';
import { ActiveOrderComponent } from 'src/components/active-order/active-order.component';
const routes: Routes = [ 
   {path: 'products',component:ProductsComponent},
  {path:'profile',component:ProfileComponent},
   {path:'',redirectTo:'/registration', pathMatch:'full'},
   {path: 'registration', component: RegistrationComponentComponent },
   {path:'neworder',component:NewOrderComponent},
   {path:'allorders',component:AllOrdersComponent},
   {path:'addproduct',component:AddProductComponent},
   {path:'verifications',component:VerificationsComponent},
   {path:'neworders',component:NewOrdersComponent},
   {path:'activeorder',component:ActiveOrderComponent},
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
