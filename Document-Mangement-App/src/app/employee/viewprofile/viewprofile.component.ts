import { EmployeeService } from './../../../Service/employee.service';
import { Employee } from 'src/app/Models/employee';
import { Component, OnInit, SecurityContext, Input } from '@angular/core';
import { collectExternalReferences } from '@angular/compiler';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';
import { url } from 'inspector';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent implements OnInit {

  UserName:any;
  userimageArray:any=[];
  UserImage:any;
  filename:any;
  sliceSize:number;
  contentType:any;
  imageUrl:any;
  UserEmail:any;
  
  imagePath: any;
 

  constructor(private httpservice:EmployeeService,private sanitizer: DomSanitizer) { }

  ngOnInit(){


    var Employeedata=JSON.parse(atob(localStorage.getItem('EMPDT')));

    this.UserName=Employeedata.Employee_name;
    this.UserEmail=Employeedata.Employee;
    this.imagePath="assets/account_circle.png"
 
    this.httpservice.GetUserProfile(Employeedata.Empid).subscribe((data)=>{   
      if(data=='' || data==undefined)
      {
        this.imagePath="assets/account_circle.png"
      }
      else{
    
      this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(data[0].Employee_Image);
      }

    });

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                //  console.log(event.target.result);
                   this.UserImage=event.target.result; 
                   this.imagePath=event.target.result;
                  
                }

                reader.readAsDataURL(event.target.files[i]);
                let file = event.target.files[i];
                let fileName = file.name;
                this.filename=fileName;
        }
    }
    // console.log(this.UploadFiledata);
  }

  Upload_New_Profile()
  {
    
    var employee =new Employee;
    var Employeedata=JSON.parse(atob(localStorage.getItem('EMPDT')));
    employee.Emp_comp_id=Employeedata.Empid;
    employee.Employee_Image=this.UserImage;  

      this.httpservice.Upload_Emp_Profile(employee).subscribe((data)=>{   
    
      });

  }
  
}
