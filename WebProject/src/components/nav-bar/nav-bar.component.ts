import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/services/UsersService';
import { UserRole } from 'src/model/UserRole';
import { TokenService } from 'src/services/TokenService';
import { Router } from '@angular/router';
import { Observable,BehaviorSubject } from 'rxjs';
import { User } from 'src/model/User';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  /////
  user :User=new User();
  private authenticated2 = new BehaviorSubject<boolean>(false); // {1}
  private admin2 = new BehaviorSubject<boolean>(false); // {1}
  private guest2 = new BehaviorSubject<boolean>(false); // {1}
  private deliverer2 = new BehaviorSubject<boolean>(false); // {1}
////
adminBool:Boolean=false
guestBool:Boolean=false
delivererBool:Boolean=false
authenticatedBool:Boolean=false
logoutBool:Boolean=false;
  
  /////
  authenticated: Observable<boolean>= this.authenticated2.asObservable();
  admin : Observable<boolean>=this.admin2.asObservable();
  guest: Observable<boolean>=this.authenticated2.asObservable();
  deliverer: Observable<boolean>=this.deliverer2.asObservable();
  constructor(public tokenService: TokenService,
    private route : Router,
    private usersService:UsersService) {

    }
  logout():void
  {
    console.log('logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('active');
    this.adminBool=false
    this.guestBool=false
    this.delivererBool=false
    this.authenticatedBool=false
    this.route.navigate(['/registration']);
  }
  ngOnInit(): void {
    console.log("nav-bar onInit")
    this.changeUserRole();
    
  }
  changeUserRole():void{
   
    
    /////////////////getting user
    // this.usersService.getAuthenticatedUser().subscribe(
    //   (data)=>{
    //     console.log(data);
    //     this.user=data as User;
      
    //   },
    //   (error : any)=>{
    //     console.log(error);
    //   }
    // );
    ////////////////////////////
    // this.authenticated2.next(false);
    // this.admin2.next(false);
    // this.guest2.next(false);
    // this.deliverer2.next(false);
    ///
    // this.authenticated=this.authenticated2.asObservable();
    // this.admin=this.admin2.asObservable();;
    // this.guest=this.authenticated2.asObservable();
    // this.deliverer=this.deliverer2.asObservable();;
    if(localStorage.getItem('token')!=null)
    {
      this.authenticatedBool=true;
            // this.authenticated=this.authenticated2.asObservable();
      var role =this.tokenService.getUserRole().toString();
      // console.log("role:",role)
      if(role=='admin')
        {
          ///
          this.adminBool=true;
          this.delivererBool=false;
          this.authenticatedBool=true;
          this.guestBool=false;
          ///

        //   this.admin2.next(true);
        //   this.guest2.next(false);
        //   this.deliverer2.next(false);
        // this.admin=this.admin2.asObservable();
        }
      else if(role=='guest')
      {
        ///
        this.adminBool=false;
        this.delivererBool=false;
        this.authenticatedBool=true;
        this.guestBool=true;
        ///
      //   this.guest2.next(true);
      //   this.admin2.next(false);
      //     this.deliverer2.next(false);
      // this.guest=this.guest2.asObservable();
      }
      else if(role=='deliverer')
      {
        ///
        this.adminBool=false;
        this.delivererBool=true;
        this.authenticatedBool=true;
        this.guestBool=false;
        ///
      //   this.deliverer2.next(true);
      //   this.admin2.next(false);
      //     this.guest2.next(false);
      // this.deliverer=this.deliverer2.asObservable();
      }

    }
    // console.log("admin:",this.adminBool);
    // console.log("guest:",this.guestBool);
    // console.log("deliverer:",this.delivererBool);
    // console.log("authenticated:",this.authenticatedBool);
  }
}
