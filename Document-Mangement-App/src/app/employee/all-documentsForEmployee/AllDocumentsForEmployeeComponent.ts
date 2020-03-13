import { EmployeeService } from './../../../Service/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-all-documents-For-Employee',
  templateUrl: './all-documentsForEmployee.component.html',
  styleUrls: ['./all-documentsForEmployee.component.scss']
})
export class AllDocumentsForEmployeeComponent implements OnInit {
  doctype: any;
  Alldocuments: any;
  constructor(private router: Router, private apiservice: EmployeeService) { }
  ngOnInit() {

    this.apiservice.GetAllDocuments().subscribe((data) => {
    //  console.log(data);
      // this.Alldocuments=JSON.parse(JSON.stringify(data));
      this.Alldocuments = JSON.parse(JSON.stringify(data));
      // const mydata=JSON.stringify(data);
    }, (error: any) => { console.log(error); });

  }

  showdocuments(document_Type_Name:string){
  
    localStorage.setItem('doctypeForEmp', document_Type_Name);
    this.router.navigate(['Employee/PerticularDoc1']);
  }
}

// import { AllDocumentsForEmployeeComponent } from './employee/all-documentsForEmployee/all-documentsForEmployee.component';

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';

// @Component({
//   selector: 'app-all-documents-For-Employee',
//   templateUrl: './all-documents-For-Employee.component.html',
//   styleUrls: ['./all-documents-For-Employee.component.scss']
// })
// export class AllDocumentsForEmployeeComponent implements OnInit {
//   doctype:any;
//   Alldocuments:any;
//   constructor(private router:Router,private apiservice:ApiService) { }

//   ngOnInit() {

//     this.apiservice.GetAllDocuments().subscribe(
//       (data)=>
//       {
//         console.log(data);
//         // this.Alldocuments=JSON.parse(JSON.stringify(data));
//     this.Alldocuments=JSON.parse(JSON.stringify(data));
//         // const mydata=JSON.stringify(data);

//       },
//       (error:any)=>{console.log(error);}
//     );
//   }
 

//     showdocuments(document_Type_Name:string){
//      localStorage.setItem('doctype',document_Type_Name);
//       this.router.navigate(['Employee/PerticularDoc']) 
    
//     }
// }
