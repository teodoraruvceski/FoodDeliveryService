import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/User';
import { UsersService } from 'src/services/UsersService';
import { UserState } from 'src/model/UserState';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.css']
})
export class VerificationsComponent implements OnInit {
  deliverers:User[]=[]
  error:String=''
  s:UserState=UserState.created
  constructor(
    private usersService:UsersService,
    private router:Router

  ) { }

  ngOnInit(): void {

    this.usersService.getAllDeliverers().subscribe(
      (data)=>{
        console.log(data);
        this.deliverers=data
      },
      (error)=>{
        this.error='Something went wrong.';
      }
    );

  }

  onChange(id:number,state:number)
  {
    let user :User=new User();
    user.id=id;
    user.state=state;
    user.username=""
    user.password="";
    user.name=""
    user.lastname=""
    user.address=""
    user.email="";
    user.role=0
    user.birthdate="2222-09-09";
    user.image="";
    this.usersService.changeUserState(user).subscribe(
      (data)=>{
        console.log(data);
        this.router.navigate(['/verifications']);
      },
      (error)=>{
        this.error='Something went wrong.';
      }
    );
  }

}
