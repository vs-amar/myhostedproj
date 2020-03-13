import { logging } from 'protractor';
import { EmployeeService } from './../../Service/employee.service';
import { Router } from '@angular/router';
import { Admin } from '../Models/admin';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  oneRecord:any;
  LoginForm:FormGroup;
  submitted =false;
  returnUrl: string; 
  message: string;
  verification_data:any;
  showLoginMessage:boolean=false;

  d:any;
  constructor(private apiservice:EmployeeService,private FormBuilder:FormBuilder,private router:Router,private cookieService: CookieService ) { }

  ngOnInit() {
    

    this.LoginForm=this.FormBuilder.group({

      UserName:['',Validators.required],
      password:['',Validators.required],
      },
      );
      this.returnUrl = '/Employee';
      }
      
      
      get f() { return this.LoginForm.controls; }
      
      Login()
      {
      
      // console.log(this.LoginForm.value);
      
      if(this.LoginForm.invalid==true)
      {
      
      this.LoginForm.reset();
      this.showLoginMessage=true;
      }
      else{
      this.apiservice.getdata(this.LoginForm.controls.UserName.value,this.LoginForm.controls.password.value).subscribe((data)=>
      {

        
       
      this.verification_data =JSON.parse(JSON.stringify(data))
     // console.log(this.verification_data.verfication);
      
      if(this.verification_data!=null)
      {
      if(this.verification_data.verfication==2)
      {

       // sessionStorage.setItem('Empid',this.verification_data.Employee_Comp_Id);
       // sessionStorage.setItem('isLoggedInEmployee', "true");
       // sessionStorage.setItem('Employee', this.LoginForm.controls.UserName.value);

        //  localStorage.setItem('Empid',this.verification_data.Employee_Comp_Id);
        //  localStorage.setItem('isLoggedInEmployee', "true");
        //  localStorage.setItem('Employee', this.LoginForm.controls.UserName.value);
          

   var Empoyeedata={Empid:this.verification_data.Employee_Comp_Id,isLoggedInEmployee:"true",Employee: this.LoginForm.controls.UserName.value,Employee_name:this.verification_data.Employee_Name};
             
    localStorage.setItem('EMPDT',btoa(JSON.stringify(Empoyeedata)));

  //         this.cookieService.set('jwtToken',btoa(JSON.stringify(USERDATA)));
         
  //          this.d=JSON.parse(atob(this.cookieService.get('jwtToken')));

  //          console.log(this.d);


          this.router.navigate(['/Employee/AllDocumentsForEmployee'])
      }
      else if(this.verification_data.verfication==1){



   var Admindata={Admin_id:this.verification_data.Employee_Comp_Id,isLoggedInAdmin:"true",Admin_name:this.verification_data.Employee_Name, Admin:this.LoginForm.controls.UserName.value};     
      //  sessionStorage.setItem('Empid',this.verification_data.Employee_Comp_Id);
       // sessionStorage.setItem('isLoggedInAdmin', "true");
       // sessionStorage.setItem('Admin', this.LoginForm.controls.UserName.value);

            localStorage.setItem('ADMINDT',btoa(JSON.stringify(Admindata)));
 
            //  console.log("in Admin");

           // localStorage.setItem('Admin', this.LoginForm.controls.UserName.value);
            
            this.router.navigate(['/AllComponent/AllDocuments'])
      }
      else{
        this.showLoginMessage=true;
        this.LoginForm.reset();
       }
      }
      else{
         this.showLoginMessage=true;
         this.LoginForm.reset();
        }
       },
       (error:any)=>{console.log(error);}
       );
       }
      }
  Clear()
  {
      this.submitted = true;
      this.LoginForm.reset();
  }
}
