import { EmployeeService } from './../../../Service/employee.service';

import { Employee } from './../../Models/employee';
import { AdminService } from 'src/Service/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';





export interface UserData {
  User_Id:string;
  User_Name:string;
  User_Image:string;
  User_Mail_Id:string;
  Password:string;
  Gender:string;
  Contact_Number:string;
  DateOfBIrth:string;
  Address:string;
  Ragistration_date:string;
  User_Location_Logitude:string;
  User_Location_Latitude:string;
  }



@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.scss']
})





export class AllEmployeeComponent implements OnInit {


  displayedColumns: string[] = ['Emp_Id','Emp_Name','Emp_email', 'Emp_Password','action'];
  
  show_Add_Emplyee_Form:boolean=false;
AllEmployee:any;
show_success_msg:boolean=false;
Success_Message:string;
success_message_css:any;



firstname = new FormControl('', [ Validators.required,  ]);
lastname= new FormControl('', [ Validators.required,  ]);
email = new FormControl('', [ Validators.required,  ]);

emp_comp_id = new FormControl('', [ Validators.required,  ]);

password= new FormControl('', [ Validators.required,  ]);


  dataSource: MatTableDataSource<UserData>;
  interval: NodeJS.Timer;
 


  constructor(private httpservice:AdminService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 

  ngOnInit() {

    this.httpservice.getallemplyee().subscribe(data=>{ 
      
      this.AllEmployee=JSON.parse(JSON.stringify(data));
      this.dataSource= new MatTableDataSource(this.AllEmployee);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
        // this.AllEmployee=[
        // {Emp_Comp_Id:"EMPOO1" ,Emp_First_Name:"AMAR",Emp_Last_Name:"JADHAV",Emp_Email:"amar@gmail.com",Emp_Password:"Amar@123"},
        // {Emp_Comp_Id:"EMPOO2" ,Emp_First_Name:"Prasad",Emp_Last_Name:"Bidwai",Emp_Email:"amar@gmail.com",Emp_Password:"Prasad@123"},
        // ]
      this.success_message_css='success_message_css1';

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fun_show_AddNewEmplyee()
  {
    this.show_Add_Emplyee_Form=!this.show_Add_Emplyee_Form
  }

  AddNewEmplyee()
  {
   
    var employee=new Employee();

    employee.Emp_First_Name=this.firstname.value;
    employee.Emp_Last_Name=this.lastname.value;
    employee.Emp_comp_id=this.emp_comp_id.value;
    employee.Emp_Email=this.email.value;
    employee.Emp_password=this.password.value;

if(employee.Emp_First_Name !="" || employee.Emp_Last_Name !="" ||employee.Emp_comp_id !="" ||employee.Emp_Email!="" ||employee.Emp_password !="")
 {
    this.httpservice.AddNewEmployee(employee).subscribe((data)=>{   

      if(data==1)
      {
        this.show_Add_Emplyee_Form=true; 
        this.show_success_msg=true;
        this.success_message_css='success_message_css1'
        this.Success_Message=".......New Employee Information Added......" 

        this.interval = setInterval(() => {
          this.show_success_msg=false;
         
          this.firstname.reset();
          this.lastname.reset();
          this.emp_comp_id.reset();
          this.password.reset();
          this.email.reset();
        },3000)

      }
      else{

        this.show_success_msg=true;
        this.success_message_css='success_message_css2'
        this.Success_Message="......Something Went Wrong Please Try Again......" 
       
        this.interval = setInterval(() => {
        
          this.firstname.reset();
          this.lastname.reset();
          this.emp_comp_id.reset();
          this.password.reset();
          this.email.reset();
          //this.show_Add_Emplyee_Form=false; 
          this.show_success_msg=false;
         
        
        },3000)

      }

  });

 }
 else{
   this.firstname.markAsTouched();
   this.lastname.markAsTouched();
   this.email.markAsTouched();
   this.password.markAsTouched();
   this.emp_comp_id.markAsTouched();
 }

}
}
