import { EmployeeService } from './../../../Service/employee.service';
import { AdminService } from './../../../Service/admin.service';
import { Routes, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfermationDilogComponent } from '../confermation-dilog/confermation-dilog.component';

@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.scss']
})
export class AllDocumentsComponent implements OnInit {
  documentType:any;
  radius: 1;
  color: "#3282b8";
  centered = true;
  disabled = false;
  unbounded = false;
  employeeId:any;
  EmplyeeList:any;
  Privatedocuments:any;
  PrivateDocForm:FormGroup;  
  
  constructor(private router:Router,private formbuilder:FormBuilder,private dialog:MatDialog, private httpservice:AdminService,private Emplyeeservice:EmployeeService) { }

  ngOnInit() {


    this.httpservice.getDocumentTypes().subscribe(data=>{ 
      
      this.documentType=JSON.parse(JSON.stringify(data));
     
    });

    this.httpservice.getallemplyee().subscribe(data=>{ 
      
      this.EmplyeeList=JSON.parse(JSON.stringify(data));
     
    });


    this.PrivateDocForm=this.formbuilder.group({

      Employee_Name:['',Validators.required],
   },
   );

    // this.documentType=[
    //   {Document_Type_Id:"1",Dcument_Type_Name:"Associate enabler"},
    //   {Document_Type_Id:"2",Dcument_Type_Name:"Investment declaration"},
    //   {Document_Type_Id:"3",Dcument_Type_Name:"Mediclaim terms & conditions"},
    //   {Document_Type_Id:"4",Dcument_Type_Name:"Mediclaim forms & links"},
    //   {Document_Type_Id:"5",Dcument_Type_Name:"Maternity benefit guidelines & form"},
    //   {Document_Type_Id:"6",Dcument_Type_Name:"POSH guidelines"},
    //   {Document_Type_Id:"7",Dcument_Type_Name:"Competency forms"}
    //   ];

  }

  funPerticularDocuments(DocType:string)
  {
    // alert(DocType);
    this.router.navigate(['AllComponent/PerticularDoc'], { state: { doctype: DocType } });
    localStorage.setItem('doctype', DocType); 
  
  }

  AddNewDoc()
  {
    this.router.navigate(['AllComponent/AddNewDocument']);

  }

  fun_PrivateDocs(EmployeeId:string)
  {
   
    this.employeeId=EmployeeId;

    this.Emplyeeservice.GetprivateDocument(EmployeeId).subscribe(
      (data)=>
      {
       // console.log(data);
         this.Privatedocuments=JSON.parse(JSON.stringify(data));
      });

  }

  Delete_Document(docname:string,docid:string):void
  {
    const dialogRef = this.dialog.open(ConfermationDilogComponent, {
      width: 'auto',
      height:'auto',   
      data: {Document_Name: docname, Document_Id: docid}
    
   });

   dialogRef.afterClosed().subscribe(data=>{
    this.Emplyeeservice.GetprivateDocument(this.employeeId).subscribe(
      (data)=>
      {
         this.Privatedocuments=JSON.parse(JSON.stringify(data));
      });
  })

  }

  Download_File(filename:string,filedata:string)
  {
     // console.log(filename+"==>"+filedata);

      const linkSource = filedata;
        const downloadLink = document.createElement("a");
        const fileName = filename;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

       

  }


}

