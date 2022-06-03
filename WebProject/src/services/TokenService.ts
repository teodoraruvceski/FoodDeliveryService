import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UserRole } from 'src/model/UserRole'; 
import { UserState } from 'src/model/UserState';

@Injectable({
    providedIn: 'root',
  })
  export class TokenService {
    constructor() {}
  occupied=false;
     getUserRole(): any {
      var token=localStorage.getItem('token');
      if(token!=null && token!='')
      {
         let claims : any= jwt_decode(token);
         for (var c in claims) {
           var claim = c.split('/');
           if (claim[claim.length - 1] === 'role') {
             return claims[c];
           }
         }
      }
        return null;
    }
    getUserState(): any {
      var token=localStorage.getItem('token');
      if(token!=null && token!='')
      {
          let claims : any= jwt_decode(token);
          for (var c in claims) {
            var claim = c.split('/');
            if (claim[claim.length - 1] === 'authorizationdecision') {
              return claims[c];
            }
          }
      }
     

     return null;
 }
 isAdmin()
 {
  if(this.getUserRole()!=null && this.getUserRole()=='admin')
    return true;
  else 
    return false;
 }
 isDeliverer()
 {
  if(this.getUserRole()!=null && this.getUserRole()=='deliverer')
  return true;
else 
  return false;
 }
 isAuthenticated()
 {
  var token=localStorage.getItem('token');
  if(token!=null && token!='')
  {
     return true;
  }
  return false;
 }
 isGuest()
 {
  if(this.getUserRole()!=null && this.getUserRole()=='guest')
    return true;
  else 
    return false;
 }
 isVerified()
 {
   var state=this.getUserState();
   if(state!=null && state=='verified')
    return true;
   else
    return false;
 }
 isCreated()
 {
   var state=this.getUserState();
   if(state!=null && state=='created')
    return true;
   else
    return false;
 }
 isDeclined()
 {
   var state=this.getUserState();
   if(state!=null && state=='declined')
    return true;
   else
    return false;
 }
startDelivery()
{
  console.log('startDel');
  this.occupied=true;
}
endDelivery()
{
  console.log('endDelivery');
  this.occupied=false;
}
isOccupied()
{
  
  console.log(localStorage.getItem('active'));
  if(localStorage.getItem('active')!=null)
    return true;
  return false;
}
 
  
  }