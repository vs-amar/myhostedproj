import { RequestComponent } from './employee/request/request.component';
import { PrivateDocumentsComponent } from './employee/private-documents/private-documents.component';
import { AllDocumentsForEmployeeComponent } from './employee/all-documentsForEmployee/AllDocumentsForEmployeeComponent';






import { FormBuilder, FormControl, FormGroup, FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injectable, } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { EmployeeComponent } from './employee/employee.component';

import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

import { MatNativeDateModule, MatInputModule, MatGridList, MatGridListModule,MatOptionModule, MatTableModule, MatTooltip, MatTooltipModule, MatDialogModule, MatToolbar, MatToolbarModule, MatToolbarRow, MatSidenavModule, MatListModule, MatFormFieldModule, MatPaginatorModule, MatFormFieldControl, MatRippleModule, } from '@angular/material';


import {MatBadgeModule} from '@angular/material/badge';

import {MatSelectModule} from '@angular/material/select';



import {MatDatepickerModule} from '@angular/material/datepicker';




import { HttpClientModule} from '@angular/common/http'; 
import { AuthGuard } from './guards/auth.guard';

import { FileUploadInputFor, MatFileUploadQueue } from 'angular-material-fileupload';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AllDocumentsComponent } from './admin-dashboard/all-documents/all-documents.component';
import { PerticularDocumentComponent } from './admin-dashboard/perticular-document/perticular-document.component';
import { AllEmployeeComponent } from './admin-dashboard/all-employee/all-employee.component';
import { AllRequestsComponent } from './admin-dashboard/all-requests/all-requests.component';
import { ScheduledMeetingsComponent } from './admin-dashboard/scheduled-meetings/scheduled-meetings.component';
import { AddNewDocumentComponent } from './admin-dashboard/add-new-document/add-new-document.component';
import { ConfermationDilogComponent } from './admin-dashboard/confermation-dilog/confermation-dilog.component';
import { ViewRequestDetailsComponent } from './admin-dashboard/view-request-details/view-request-details.component';
import { MeetingScheduleDetailsComponent } from './admin-dashboard/meeting-schedule-details/meeting-schedule-details.component';
import { LoginComponent } from './login/login.component';
import { PerticularDocumentForEmployeeComponent } from './employee/perticular-documentForEmployee/perticular-documentForEmployee.component';
import { CookieService } from 'ngx-cookie-service';
import { PushNotificationService } from 'ngx-push-notifications';
import { DocshareListComponent } from './admin-dashboard/docshare-list/docshare-list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ViewprofileComponent } from './employee/viewprofile/viewprofile.component';

@NgModule({
  declarations: [
    AppComponent,

    AdminDashboardComponent,
    AllDocumentsComponent,
    PerticularDocumentComponent,
    AllEmployeeComponent,
    AllRequestsComponent,
    ScheduledMeetingsComponent,
    AddNewDocumentComponent,
    ConfermationDilogComponent,
    ViewRequestDetailsComponent,
    MeetingScheduleDetailsComponent,

    EmployeeComponent,
    RequestComponent,
      PerticularDocumentForEmployeeComponent,
     LoginComponent,
     PrivateDocumentsComponent,
     AllDocumentsForEmployeeComponent,
     DocshareListComponent,
     ViewprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatRippleModule,
    MatInputModule,
    MatBadgeModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    HttpClientModule,
    RoundProgressModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule, 
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    FormsModule,  
    ReactiveFormsModule,
    HttpClientModule, 
    MatCheckboxModule,
    MatTooltipModule
    
  ],
  providers: [
    DatePipe,
    FileUploadInputFor,
    MatFileUploadQueue,
    FormBuilder ,
    [AuthGuard],
    CookieService,
PushNotificationService 

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
