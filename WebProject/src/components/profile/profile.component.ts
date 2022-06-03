import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/User';
import { UsersService } from 'src/services/UsersService';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   url='';
  user:User=new User();
   //form
   error: string ='';
   profileChangeForm = new FormGroup({
     username: new FormControl('', Validators.required),
     email: new FormControl('', [Validators.required, Validators.email]),
     name: new FormControl('', Validators.required),
     lastname: new FormControl('', Validators.required),
     birthdate: new FormControl('', Validators.required),
     address: new FormControl('', Validators.required),
     image : new FormControl('')
   });
  constructor(private usersService:UsersService,
    public datepipe:DatePipe,
    public route:Router) { 
    this.usersService.getAuthenticatedUser().subscribe(
      (data)=>{
        console.log(data);
        this.user=data as User;
        console.log('this.user:',this.user)
        this.profileChangeForm.controls["name"].setValue(this.user.name);
        this.profileChangeForm.controls["lastname"].setValue(this.user.lastname);
        this.profileChangeForm.controls["email"].setValue(this.user.email);
        this.profileChangeForm.controls["username"].setValue(this.user.username);
        this.profileChangeForm.controls["address"].setValue(this.user.address);
        var bd=new Date(this.user.birthdate);
        console.log(bd);
        console.log('img:',this.user.image);

        var datetype: Date=new Date(bd);
        console.log('datetype:',datetype);
        let _date =this.datepipe.transform(datetype, 'yyyy-MM-dd');
        console.log('_date:',_date);
        this.url=this.user.image;

        this.profileChangeForm.controls["birthdate"].patchValue(_date);
      },
      (error : any)=>{
        this.error='Something went wrong.';
        console.log(error);
      }
    );
    
  }

  ngOnInit(): void {
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
 onChange()
 {
   let datum=this.profileChangeForm.controls['birthdate'].value;
   

    let bd=new Date(this.user.birthdate);
    let datetype: Date=new Date(bd);
    let _date =this.datepipe.transform(datetype, 'yyyy-MM-dd');
 console.log(datum+' vs '+_date);
 console.log("user.name:",this.user.name," vs ","form.name:",this.profileChangeForm.controls["name"].value);
   if(this.user.name!=this.profileChangeForm.controls["name"].value
    || this.user.lastname!=this.profileChangeForm.controls["lastname"].value
    || this.user.username!=this.profileChangeForm.controls["username"].value
    || this.user.address!=this.profileChangeForm.controls["address"].value
    || this.user.name!=this.profileChangeForm.controls["name"].value
    || _date!=datum)
    {
      console.log("sending new user")
      console.log("controls:",this.profileChangeForm.controls);
        if(this.profileChangeForm.valid)
        {
          
          this.user.name=this.profileChangeForm.controls["name"].value;
          this.user.lastname=this.profileChangeForm.controls["lastname"].value;
          this.user.username=this.profileChangeForm.controls["username"].value;
          this.user.address=this.profileChangeForm.controls["address"].value;
          this.user.birthdate=this.profileChangeForm.controls["birthdate"].value;
          this.user.password="";
          this.user.orders=[];
          this.user.image=this.url;
          this.usersService.changeProfile(this.user).subscribe(
            (data)=>{
              
              console.log(data);
              this.error='';
              this.route.navigate(['/products']);
              
            },
            (error)=>{
              console.log('error:',error)
              this.error='Something went wrong.';
            }
        );
        }
    }
    else
    {
      this.route.navigate(['/products']);
    }
 }
 
}
