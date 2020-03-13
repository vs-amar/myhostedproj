import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from 'src/app/Models/admin';
import { Request } from 'src/app/Models/request';
import { Documents } from 'src/app/Models/documents';
import { Employee } from 'src/app/Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpclient:HttpClient) { }
  SaveRequest(std:Request)
  {
  //console.log(std)
  return this.httpclient.post<Request>('http://192.168.0.52:5001/api/Employee/PostRequest/',std,{
  });
  }
  
  getdata(email:string,password:string)
  {
  var std=new Admin();
  std.Admin_Email=email;
  std.Admin_Password=password;
  return this.httpclient.post('http://192.168.0.52:5001/api/Employee/PostdataForAdmin/',std);
  }
  
  
  ShowDocument(doctype:string)
  {
    var Employeedata=JSON.parse(atob(localStorage.getItem('EMPDT')));
  var std=new Documents;
  std.Document_Type=doctype;
  std.Emp_Comp_Id=Employeedata.Empid;

  return this.httpclient.post('http://192.168.0.52:5001/api/Employee/GetPerticularDocument/',std);
  }
  
  GetAllDocuments()
  {
  return this.httpclient.get('http://192.168.0.52:5001/api/Employee/GetAllDocument/');
  }
  
  GetPerticDocDrop()
  {
    var Employeedata=JSON.parse(atob(localStorage.getItem('EMPDT')));
  return this.httpclient.get('http://192.168.0.52:5001/api/Employee/GetAllDocumentsForRequest/'+Employeedata.Empid);
  }
  
  GetprivateDocument(Employee_Id:string)
  {
  // console.log(Employee_Id);
  
  return this.httpclient.post('http://192.168.0.52:5001/api/Employee/'+Employee_Id,'');
  }
  
  DownloadFile()
  {
  return this.httpclient.get('http://192.168.0.52:5001/api/Employee/downloadfile/');
  }
  
  logout()
  {
    console.log("hii logout..!");
    var Employeedata=JSON.parse(atob(localStorage.getItem('EMPDT')));
    return this.httpclient.put('http://192.168.0.52:5001/api/Employee/LogOutEmp/'+Employeedata.Empid,'');
  }

  Upload_Emp_Profile(employee:Employee)
  {
    return this.httpclient.post("http://192.168.0.52:5001/api/Employee/UploadEmployeeProfile",employee);
  }

  GetUserProfile(Empid:string)
  {
    return this.httpclient.get('http://192.168.0.52:5001/api/Employee/GetUserProfile/'+Empid);
  }

}
