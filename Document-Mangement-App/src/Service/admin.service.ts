import { SharedDocument } from './../Models/shared-document';
import { Employee } from 'src/app/Models/employee';
import { AllRequestsComponent } from './../app/admin-dashboard/all-requests/all-requests.component';
import { MeetingDetails } from './../Models/meeting-details';
import { Documents } from './../Models/documents';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  invokeFirstComponentFunction = new EventEmitter<AllRequestsComponent>();    
  subsVar: Subscription; 

  constructor(private httpClient:HttpClient ) { }


  FunEventEmitter()
  {
   this.invokeFirstComponentFunction.emit();
  }


  AddNewEmployee(employee:Employee)
  {
    return this.httpClient.post("http://192.168.0.52:5001/api/Admin/addNewEmployee",employee);
  }

  Upload_Document(documentdata:Documents)
  {     
    return this.httpClient.post("http://192.168.0.52:5001/api/Admin/adddocument",documentdata);
  }

  getperticularDoc(docname:string)
  {
  
    return this.httpClient.get("http://192.168.0.52:5001/api/Admin/GetPerticularDocument/"+docname);
  }

  deleteDocument(docname:string,docid:string)
  {
    return this.httpClient.put("http://192.168.0.52:5001/api/Admin/DeleteDocument/"+docname+"/"+docid,'');
  }

  getallemplyee()
  {
    return this.httpClient.get("http://192.168.0.52:5001/api/Admin/GetAllEmplyee");
  }
  getallRequest()
  {
    return this.httpClient.get("http://192.168.0.52:5001/api/Admin/GetAllRequests");
  }

  getDocShareedListOfEmp(Document_Id:string)
  {
    return this.httpClient.get("http://192.168.0.52:5001/api/Admin/getDocShareedListOfEmp/"+Document_Id,);
  }
  
  getallSchedules()
  {
    return this.httpClient.get("http://192.168.0.52:5001/api/Admin/GetAllSchedules");
  }

  getDocumentTypes()
  {
    return this.httpClient.get("http://192.168.0.52:5001/api/Admin/AllDocumentType");
  }

  AddSchedule(meetingdetails:MeetingDetails)
  {
    //console.log(meetingdetails.Emp_Comp_Id);
    return this.httpClient.post("http://192.168.0.52:5001/api/Admin/addMeeting",meetingdetails,{ });

  }

  UpdateMeetingStatus(meetingId:string)
  {

    return this.httpClient.put("http://192.168.0.52:5001/api/Admin/Update_Scheduled_Meeting_Status/"+meetingId,'');

  }

  ShareDocument(sharedocument:SharedDocument)
  {
    return this.httpClient.post("http://192.168.0.52:5001/api/Admin/ShareDocument",sharedocument,{ });
  }

}

