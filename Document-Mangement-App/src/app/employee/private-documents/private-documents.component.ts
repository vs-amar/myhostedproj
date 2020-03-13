import { EmployeeService } from './../../../Service/employee.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-documents',
  templateUrl: './private-documents.component.html',
  styleUrls: ['./private-documents.component.scss']
})
export class PrivateDocumentsComponent implements OnInit {
  Allprivatedocuments:any;
  constructor(private apiservice:EmployeeService) { }

  ngOnInit() {
  
    var Employeedata=JSON.parse(atob(localStorage.getItem('EMPDT')));

    this.apiservice.GetprivateDocument(Employeedata.Empid).subscribe(
      (data)=>
      {
       
        // this.Alldocuments=JSON.parse(JSON.stringify(data));
         this.Allprivatedocuments=JSON.parse(JSON.stringify(data));
        // const mydata=JSON.stringify(data);
       // console.log(this.Allprivatedocuments);

      },
      (error:any)=>{console.log(error);}
    );

    }
    Download_File(filename:string,filedata:string)
   {
    //  console.log(filename);
    // console.log (filedata);
    const linkSource = filedata;
    const downloadLink = document.createElement("a");
    const fileName = filename;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
   }
  }


