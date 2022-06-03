import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgForm, FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponentComponent } from 'src/components/registration/registration-component/registration-component.component';
import { NavBarComponent } from 'src/components/nav-bar/nav-bar.component';
import { ProductsComponent } from 'src/components/products/products.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { NewOrderComponent } from 'src/components/new-order/new-order.component';
import { AllOrdersComponent } from 'src/components/all-orders/all-orders.component'; 
import { AddProductComponent } from 'src/components/add-product/add-product.component';
import { VerificationsComponent } from 'src/components/verifications/verifications.component';
import { NewOrdersComponent } from 'src/components/new-orders/new-orders.component';
import { ActiveOrderComponent } from 'src/components/active-order/active-order.component';
import { TokeninterceptorService } from 'src/services/token-inceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponentComponent,
    NavBarComponent,
    ProductsComponent,
    ProfileComponent,
    NewOrderComponent,
    AllOrdersComponent,
    AddProductComponent,
    VerificationsComponent,
    NewOrdersComponent,
    ActiveOrderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    NavBarComponent,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeninterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
