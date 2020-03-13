import { ViewprofileComponent } from './employee/viewprofile/viewprofile.component';
import { DocshareListComponent } from './admin-dashboard/docshare-list/docshare-list.component';
import { RequestComponent } from './employee/request/request.component';
import { PrivateDocumentsComponent } from './employee/private-documents/private-documents.component';
import { AllDocumentsForEmployeeComponent } from './employee/all-documentsForEmployee/AllDocumentsForEmployeeComponent';

import { PerticularDocumentForEmployeeComponent } from './employee/perticular-documentForEmployee/perticular-documentForEmployee.component';



import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeComponent } from './employee/employee.component';


import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PerticularDocumentComponent } from './admin-dashboard/perticular-document/perticular-document.component';
import { AllEmployeeComponent } from './admin-dashboard/all-employee/all-employee.component';
import { AllRequestsComponent } from './admin-dashboard/all-requests/all-requests.component';
import { ScheduledMeetingsComponent } from './admin-dashboard/scheduled-meetings/scheduled-meetings.component';
import { AddNewDocumentComponent } from './admin-dashboard/add-new-document/add-new-document.component';
import { ConfermationDilogComponent } from './admin-dashboard/confermation-dilog/confermation-dilog.component';
import { ViewRequestDetailsComponent } from './admin-dashboard/view-request-details/view-request-details.component';
import { MeetingScheduleDetailsComponent } from './admin-dashboard/meeting-schedule-details/meeting-schedule-details.component';
import { AllDocumentsComponent } from './admin-dashboard/all-documents/all-documents.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';

;

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
  },
      {
        path:'AllComponent',
         component:AdminDashboardComponent,canActivate:[AuthAdminGuard] ,
         children:[
           {
            path:'PerticularDoc',
            component:PerticularDocumentComponent,
           },
           {
            path:'AllEmployee',
            component:AllEmployeeComponent,
           },
           {
            path:'AllRequests',
            component:AllRequestsComponent,
           },
           {
            path:'AllMeetingSchedules',
            component:ScheduledMeetingsComponent,
           },
           {
            path:'AddNewDocument',
            component:AddNewDocumentComponent,
           },
           {
            path:'confermation',
            component:ConfermationDilogComponent,
           },
           {
            path:'ViewRequestDetails',
            component:ViewRequestDetailsComponent,
           },
           {
            path:'MeetingScheduleDetails',
            component:MeetingScheduleDetailsComponent,
           },
           {
            path:'AllDocuments',
            component:AllDocumentsComponent,
           },
           {
            path:'docshareList',
            component:DocshareListComponent,
           },


         ]
        },


        {
          path:'Employee',
          component:EmployeeComponent,canActivate:[AuthGuard],
          children:[
            {
              path:'AllDocumentsForEmployee',
              component:AllDocumentsForEmployeeComponent  ,
  
            },
            {
              path:'PerticularDoc1',
              component:PerticularDocumentForEmployeeComponent,
            },
            {
              path:'Private',
              component:PrivateDocumentsComponent,
            },
            {
              path:'request',
              component:RequestComponent,
            },
            {
              path:'viewprofile',
              component:ViewprofileComponent,
            },
            
          ],
          
        },

{
  path:'',redirectTo:'login',pathMatch:'full'
   
}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


