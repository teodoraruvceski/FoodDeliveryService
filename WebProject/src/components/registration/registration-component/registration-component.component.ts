import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/AuthenticationService';
import {TokenService} from  'src/services/TokenService';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/model/User';
import {Token} from 'src/model/Token';
import { NavBarComponent } from 'src/components/nav-bar/nav-bar.component';
import { UserRole } from 'src/model/UserRole';
import { UserState } from 'src/model/UserState';
import { DatePipe } from '@angular/common';
import { OrdersService } from 'src/services/OrdersService';
import { Order } from 'src/model/Order';
@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent implements OnInit {
  error: string ='';
  url: string = '';
  registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    image : new FormControl('')
  });
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });
  constructor(
    private service: AuthenticationService,
    private route: Router,
    private tokenService : TokenService,
    private navBar : NavBarComponent,
    public datepipe: DatePipe,
    public ordersService:OrdersService
    ) { }
  onRegister()
  {
    
    if (
      this.registrationForm.valid &&
      this.registrationForm.controls['password'].value ===
        this.registrationForm.controls['password2'].value &&
        new Date(this.registrationForm.controls['birthdate'].value) < new Date()) {
        console.log('registration');
        
        this.error='';

        let user:User =new User();
        user.username=this.registrationForm.controls["username"].value;
        user.password=this.registrationForm.controls["password"].value;
        user.name=this.registrationForm.controls["name"].value;
        user.lastname=this.registrationForm.controls["lastname"].value;
        user.address=this.registrationForm.controls["address"].value;
        user.email=this.registrationForm.controls["email"].value;
        //user.role=this.registrationForm.controls["role"].value;
        var role=this.registrationForm.controls["role"].value;
        console.log("user.role:",user.role)

        if(role=="GUEST" || role == "ADMIN")
        {
          user.state=1;
        } 
        else{
            user.state=0;
        }
        if(role == "ADMIN")
        {
          user.role=0;
          console.log("aaaaaaa:",user.role)
        }
        else if(role=="GUEST")
        {
          user.role=1;
          console.log("aaaaaaa:",user.role)
        }
        else 
        {
          user.role=2;
          console.log("aaaaaaa:",user.role)
        }
      

        user.birthdate=this.registrationForm.controls["birthdate"].value;
        //user.birthdate=_date || '';
        user.id=0;
       user.image=this.url;
       console.log('img:',user.image);
        this.service.register(user).subscribe(
            (data)=>{
              console.log(data);
              this.user_login();
            },
            (error)=>{
              console.log(error)
              this.error='Something went wrong.';
            }
        );
    }
    else{
      this.error='Incorrect input.';

      console.log()
        console.log(new Date())
        console.log(this.registrationForm.valid)////////////////
        console.log(new Date(this.registrationForm.controls['birthdate'].value) < new Date())//////////////////////
      console.log(this.registrationForm.controls['password'].value);
      console.log(this.registrationForm.controls['password2'].value);
    }
  }
  onLogin()
  {
        this.registrationForm.controls["username"].setValue("");
        this.registrationForm.controls["password"].setValue("");
        this.registrationForm.controls["password2"].setValue("");
        this.registrationForm.controls["name"].setValue("");
        this.registrationForm.controls["lastname"].setValue("");
        this.registrationForm.controls["address"].setValue("");
        this.registrationForm.controls["email"].setValue("");
        this.registrationForm.controls["role"].setValue(null);
        this.url='';
      if(this.loginForm.valid)
      {
        console.log("valid")
        let user:User =new User();
        user.username=""
        user.password=this.loginForm.controls["password"].value;
        user.name=""
        user.lastname=""
        user.address=""
        user.email=this.loginForm.controls["email"].value;
        user.role=0
       
        user.birthdate="2222-09-09";
        user.id=0;
        user.image="";
       user.state=0;
        this.service.login(user).subscribe(
            (data)=>{
              if(data=="User doesn't exists.")
              {
                this.error='Email or password not valid.';
              }
              else if(data!=null)
              {
                console.log('data: ',data);
                localStorage.setItem("token",(data as Token).tokenString);
                console.log('token:role: ',this.tokenService.getUserRole());
                this.ordersService.getActiveOrder().subscribe(
                  (data:Order)=>{
                    if(data!=null)
                    {
                      localStorage.setItem('active','true') 
                    }
                  },
                  (error:any)=>{
                    this.error='Something went wrong.';
                    console.log(error);
                  }
                );
                this.route.navigate(['/products']);
              }
              else
                console.log('else');
              
            },
            (error)=>{
              console.log(error);
              this.error='Something went wrong.';
            }
        );
      }
      else
      {
        console.log("invalid")
        this.error='Invalid email or password.';
      }
  }
  ngOnInit(): void {
    this.navBar.changeUserRole();
  }
  userlogin = true;
  userregister = false;
  //Buttons clicks functionalities 
  user_register()
  {
    this.registrationForm.controls["username"].setValue("");
    this.registrationForm.controls["password"].setValue("");
    this.registrationForm.controls["password2"].setValue("");
    this.registrationForm.controls["name"].setValue("");
    this.registrationForm.controls["lastname"].setValue("");
    this.registrationForm.controls["address"].setValue("");
    this.registrationForm.controls["email"].setValue("");
    this.registrationForm.controls["role"].setValue(null);
    this.registrationForm.controls["birthdate"].setValue('');
    this.url='';
    this.userlogin = false;
    this.userregister = true;
  }
  user_login()
  {
    this.loginForm.controls["email"].setValue("");
    this.loginForm.controls["password"].setValue("");
    this.userlogin = true;
    this.userregister = false;
  }
  onSelectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
}

