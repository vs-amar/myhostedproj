import { element } from 'protractor';
import { SharedDocument } from './../../../Models/shared-document';
import { Documents } from './../../../Models/documents';
import { AdminService } from './../../../Service/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-docshare-list',
  templateUrl: './docshare-list.component.html',
  styleUrls: ['./docshare-list.component.scss']
})
export class DocshareListComponent implements OnInit {

  constructor(private httpservice:AdminService, @Inject(MAT_DIALOG_DATA) public data: Documents) { }
  EmployeeList:any;
  ShareList:any=[];
  UnShareList:any=[];
  DocShareEmpList:any;
  ngOnInit() {

    this.httpservice.getallemplyee().subscribe(data=>{ 
      
      this.EmployeeList=JSON.parse(JSON.stringify(data));
     
    });

    this.httpservice.getDocShareedListOfEmp(this.data.Document_Id).subscribe(data=>{
        
      console.log(data);
      this.DocShareEmpList=JSON.parse(JSON.stringify(data));
      for(var i=0;i<this.DocShareEmpList.length;i++)
      {
        this.ShareList.push(this.DocShareEmpList[i].Emp_Comp_Id);
      }

    });

   
  }
  selectedEmp(Emp_Comp_Id:string,isChecked: boolean)
  {
    
     
    if (isChecked)
    {
    this.ShareList.push(Emp_Comp_Id);
    }
    else
    {
    
    const index: number = this.ShareList.indexOf(Emp_Comp_Id);
    if (index !== -1) {
    this.ShareList.splice(index, 1);
    this.UnShareList.push(Emp_Comp_Id);
    }
    
    }
   // console.log(this.data.Document_Id+""+this.data.Document_Name);
    console.log("shared"+this.ShareList);
    console.log("Unshared"+this.UnShareList);
    }

    Share()
    {
      var sharedocument=new SharedDocument();
      sharedocument.Document_Id=this.data.Document_Id;
      sharedocument.Emp_Comp_Id_Share=JSON.stringify(this.ShareList);
      sharedocument.Emp_Comp_Id_UnShare=JSON.stringify(this.UnShareList);

      this.httpservice.ShareDocument(sharedocument).subscribe(data=>{ 
      
        this.EmployeeList=JSON.parse(JSON.stringify(data));
       
      });
    }

    IsCheked(Emp_Comp_Id:string)
    { 
      const index: number = this.ShareList.indexOf(Emp_Comp_Id);
      if(index>=0)
      {
         return true;
      }
      else{
           return;
      }
  }

   
  }
