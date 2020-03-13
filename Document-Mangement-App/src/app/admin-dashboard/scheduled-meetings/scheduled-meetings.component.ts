import { MeetingScheduleDetailsComponent } from './../meeting-schedule-details/meeting-schedule-details.component';
import { AdminService } from 'src/Service/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserData } from '../all-employee/all-employee.component';
import { DatePipe } from '@angular/common';
import { Subscribable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-scheduled-meetings',
  templateUrl: './scheduled-meetings.component.html',
  styleUrls: ['./scheduled-meetings.component.scss']
})
export class ScheduledMeetingsComponent implements OnInit {
scheduledMeetings:any;
newdate:any;
currentDate:any
name:boolean=true;
new_icon_blink:string;
icon:string;

  displayedColumns: string[] = ['new','Emp_Name','Document', 'Date','Time','Meeting_Room','action'];
  


    
    dataSource: MatTableDataSource<UserData>;
   

  constructor(private datePipe:DatePipe,private httpservice:AdminService,private dialog:MatDialog) { }

  private updateSubscription:Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 

  ngOnInit() {

                  this.httpservice.getallSchedules().subscribe(data=>{ 

                    this.scheduledMeetings=JSON.parse(JSON.stringify(data));
                
                    this.dataSource= new MatTableDataSource(this.scheduledMeetings);
                    this.dataSource.paginator = this.paginator;
                   this.dataSource.sort=this.sort;
                    

                    localStorage.setItem('ScheduledMeetingCount',this.scheduledMeetings.length);
                  });     

                  this.new_icon_blink='new_icom_Not_blink';
                

    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    compareDates(datetocheck:string){

      this.newdate=new Date();
      this.currentDate = this.datePipe.transform(this.newdate, 'MM-dd-yyyy');
 

      let newdate= this.datePipe.transform(datetocheck, 'MM-dd-yyyy');
    
      // console.log(this.currentDate+"==>"+newdate);
    
       if(this.currentDate<=newdate)
       {
        
        // localStorage.setItem('RequestCount',(this.RequestCount++).toString());
        if(this.currentDate==newdate)
        {
          
          this.new_icon_blink='new_icom_blink';
          
          this.icon="notification_important"
        }
        else{
          this.new_icon_blink='new_icom_Not_blink';
          this.icon="fiber_new";
        }
       
         return true;


       }
    
       else
       {
        return false;
       }  
   }

   funViewScheduleDetails(meetingid:string)
   {

    const dialogRef = this.dialog.open(MeetingScheduleDetailsComponent, {
      width: 'auto',
      height:'auto',  
      panelClass:'custom-dialog-container',
      data: {Meeting_Id:meetingid , Emp_Comp_Id:'', Meeting_Date: '', Meeting_Time: '',Request_Id:'',Meeting_Room:''}

   });

   dialogRef.afterClosed().subscribe(data=>{
    this.httpservice.getallSchedules().subscribe(data=>{ 

      this.scheduledMeetings=JSON.parse(JSON.stringify(data));
   
      this.dataSource= new MatTableDataSource(this.scheduledMeetings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      localStorage.setItem('ScheduledMeetingCount',this.scheduledMeetings.length);
    });
   })
   }
 
}
