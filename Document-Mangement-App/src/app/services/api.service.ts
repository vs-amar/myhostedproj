import { Documents } from './../Models/documents';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../Models/admin';
import { Request } from '../Models/request';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient:HttpClient) { }
  SaveRequest(std:Request)
{
   //console.log(std)
  return this.httpclient.post<Request>('https://localhost:44303/api/Employee/Postdata/',std,{
  });
}

getdata(email:string,password:string)
{
 
  var std=new Admin();
  std.Admin_Email=email;
  std.Admin_Password=password;
return this.httpclient.post('https://localhost:44303/api/Employee/Postdata1/',std);
}


ShowDocument(doctype:string)
{

  var std=new Documents;
  std.Document_Type=doctype;
  return this.httpclient.post('https://localhost:44303/api/Employee/GetPerticularDocument/',std);
}
GetAllDocuments()
{
  return this.httpclient.get('https://localhost:44303/api/Employee/GetAllDocument/');
}

GetPerticDocDrop()
{
  return this.httpclient.get('https://localhost:44303/api/Employee/GetPerticDocDrop/');
}

GetprivateDocument(Employee_Id:string)
{
  console.log(Employee_Id);
  
  return this.httpclient.post('https://localhost:44303/api/Employee/'+Employee_Id,'');
}
DownloadFile()
{
  
  return this.httpclient.get('https://localhost:44303/api/Employee/downloadfile/');
}

logout() :void {    
 
} 

}

