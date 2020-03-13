import { Router } from '@angular/router';
import { EmployeeService } from '../../../Service/employee.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-perticular-document-For-Employee',
  templateUrl: './perticular-documentForEmployee.component.html',
  styleUrls: ['./perticular-documentForEmployee.component.scss']
})
export class PerticularDocumentForEmployeeComponent implements OnInit {
 

  doctype:any;
  documentType:any;
  constructor(private apiservice:EmployeeService,private router:Router) { }

  ngOnInit() {
  
    this.doctype= localStorage.getItem('doctypeForEmp');
   
    this.apiservice.ShowDocument(this.doctype).subscribe(
      (data)=>
    {

      this.documentType=JSON.parse(JSON.stringify(data)) ;
    // console.log(this.documentType);
    },
    (error:any)=>{console.log(error);}
    );
   }
   
   Download_File(filename:string,filedata:string)
   {
    // console.log(filename);
    // console.log (filedata);
    const linkSource = filedata;
    const downloadLink = document.createElement("a");
    const fileName = filename;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
   }

   Back()
   {
     this.router.navigate(['/Employee/AllDocumentsForEmployee'])
   }
 
 

  }

