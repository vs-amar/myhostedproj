import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 

   
  constructor(private router: Router) { }   

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      

     if (this.isLoggedInEmployee()) {      
     return true;      
     }      
     else{
      this.router.navigate(['/login']);  
     }   
  

return false;      
}      

public  isLoggedInEmployee(): boolean {      
  let status = false;   
try{
   var Employeedata=JSON.parse(atob(localStorage.getItem('EMPDT')));
  // console.log(Employeedata);
  
   if ( Employeedata.isLoggedInEmployee=="true") {      
      status = true;      
   }    
   else {      
      status = false;  
      this.router.navigate(['/login']);  
      } 
}


catch(error)
{
   status = false;
}
      
  return true;      
  } 
  

}
