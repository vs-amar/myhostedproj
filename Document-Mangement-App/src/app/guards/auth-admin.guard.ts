import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private router: Router) { }   

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      

    if (this.isLoggedInAdmin()) {      
      return true;      
      }  
      else{
        this.router.navigate(['/login']);  
       }
  }

  public isLoggedInAdmin(): boolean {      
    let status = false;    

    try
    {
        var Admindata=JSON.parse(atob(localStorage.getItem('ADMINDT')));
      
       // console.log(Admindata);
      
        if (Admindata.isLoggedInAdmin == "true"){      
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

   
