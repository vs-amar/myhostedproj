import { EmployeeService } from './../../../Service/employee.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Request } from 'src/app/Models/request';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  Alldocuments:any;
  submitted =false;
  id:any;
  ShowMesaage:boolean=false;
  timeLeft: number = 60;

  requestForm:FormGroup;   
  interval: NodeJS.Timer;
  ShowRequest: boolean;



  constructor(private apiservice:EmployeeService,private formbuilder:FormBuilder,private router:Router) { }

  @ViewChild('autosize', {static: true}) autosize: CdkTextareaAutosize;

  ngOnInit() {

  
    this.apiservice.GetPerticDocDrop().subscribe(
      (data)=>
      {
      // console.log(data);
      // this.Alldocuments=JSON.parse(JSON.stringify(data));
      this.Alldocuments=JSON.parse(JSON.stringify(data));
      // const mydata=JSON.stringify(data);
      
      },
      (error:any)=>{console.log(error);}
      );
      
      this.requestForm=this.formbuilder.group({
      
      Request_Message:['',Validators.required],
      Related_Document_Id:['',Validators.required],
      Emp_Id:['',],
      
      },
      );
      
      }
      
      get f() { return this.requestForm.controls; }
      DisplayForm(){
      
      this.router.navigate(['/Employee'])
      }
      
      Request()
      {
      if(this.requestForm.invalid==true)
      {
      this.ShowMesaage=true;
      this.interval = setInterval(() => {
      this.ShowMesaage=false;
      
      },2000)
      }
      else{
      
        var Employeedata=JSON.parse(atob(localStorage.getItem('EMPDT')));

      this.id=Employeedata.Empid;
      
      var requestDetails=new Request;
      requestDetails.Emp_Comp_Id=this.id;
      
      requestDetails.Related_Document_Id=this.requestForm.controls['Related_Document_Id'].value;
      requestDetails.Request_Message=this.requestForm.controls['Request_Message'].value;
      
      this.apiservice.SaveRequest(requestDetails).subscribe(
      (data) => {
      this.ShowRequest=true;
      this.interval = setInterval(() => {
      this.ShowRequest=false;
      
      if(this.timeLeft > 0)
      {
      this.timeLeft--;
      }
      else
      {
      this.timeLeft = 60;
      }
      },3000)
      this.clear();
      },
      );
      }
      }
      clear()
      {
      
      this.submitted = true;
      this.requestForm.reset();
      }
    }

