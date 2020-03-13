import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { EmployeeService } from './../../Service/employee.service';


import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  authService: any;
  EmplyeeName:any;
  
  AllDocClick:boolean=false;
  PrivateDocClcik:boolean=false;
  RequestClick:boolean=false;
  
  nav_item_AllDoc:any;
  nav_item_Private:any;
  nav_item_Request:any;
  
  routeurl:any;
  

  @ViewChild('sidenav',{static: true}) sidenav: MatSidenav;
  UserName: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      if (event.target.innerWidth < 500) {
          this.sidenav.opened=false;
      }
  }


  constructor(private router:Router,private service:EmployeeService,private cookieService: CookieService,private dialog:MatDialog) { }
  
  ngOnInit() {
  
  this.routeurl=this.router.url.split('/');
  
  if(this.routeurl[2]=="AllDocumentsForEmployee")
  {
  this.nav_item_AllDoc='nav_item_AllDoc2'
  this.nav_item_Private='nav_item_privateDoc1'
  this.nav_item_Request='nav_item_Req1'
  this.AllDocClick=true;
  this.PrivateDocClcik=false;
  this.RequestClick=false;
  }
  else if(this.routeurl[2]=="PerticularDoc1")
  {
  this.nav_item_AllDoc='nav_item_AllDoc2'
  this.nav_item_Private='nav_item_privateDoc1'
  this.nav_item_Request='nav_item_Req1'
  this.AllDocClick=true;
  this.PrivateDocClcik=false;
  this.RequestClick=false;
  }
  
  
  
  else if(this.routeurl[2]=="Private")
  {
  
  this.nav_item_AllDoc='nav_item_AllDoc1'
  this.nav_item_Private='nav_item_privateDoc2'
  this.nav_item_Request='nav_item_Req1'
  this.AllDocClick=false;
  this.PrivateDocClcik=true;
  this.RequestClick=false;
  
  }
  else if(this.routeurl[2]=="request")
  {
  
  this.nav_item_AllDoc='nav_item_AllDoc1'
  this.nav_item_Private='nav_item_privateDoc1'
  this.nav_item_Request='nav_item_Req2'
  this.AllDocClick=false;
  this.PrivateDocClcik=false;
  this.RequestClick=true;
  }

  var Employeedata=JSON.parse(atob(localStorage.getItem('EMPDT')));

  this.EmplyeeName=Employeedata.Employee;
  this.UserName=Employeedata.Employee_name;
  
  }
  
  logout(){
  
    this.service.logout().subscribe((data)=>{
      localStorage.removeItem('EMPDT');
  
      // this.cookieService.delete('jwtToken');
     this.router.navigate(['/login']);
    });
  //localStorage.setItem('isLoggedInEmployee','false');
  //localStorage.removeItem('Employee');
  

  }
  DisplayForm()
  {
  this.router.navigate(['/request']);
  }
  
  funAllDoc()
  {
  this.nav_item_AllDoc='nav_item_AllDoc2'
  this.nav_item_Private='nav_item_privateDoc1'
  this.nav_item_Request='nav_item_Req1'
  this.AllDocClick=true;
  this.PrivateDocClcik=false;
  this.RequestClick=false;
  }
  
  funPrivate_Click()
  {
  this.nav_item_AllDoc='nav_item_AllDoc1'
  this.nav_item_Private='nav_item_privateDoc2'
  this.nav_item_Request='nav_item_Req1'
  this.AllDocClick=false;
  this.PrivateDocClcik=true;
  this.RequestClick=false;
  
  }
  
  funRequest_Click()
  {
  this.nav_item_AllDoc='nav_item_AllDoc1'
  this.nav_item_Private='nav_item_privateDoc1'
  this.nav_item_Request='nav_item_Req2'
  this.AllDocClick=false;
  this.PrivateDocClcik=false;
  this.RequestClick=true;
  }

  View_Profile()
  {
    const dialogRef = this.dialog.open(ViewprofileComponent, {
      width: 'auto',
      height:'auto',  
      position:{top:'1%',left:'auto'},
      data: {}
  
   });

  }
 
}
