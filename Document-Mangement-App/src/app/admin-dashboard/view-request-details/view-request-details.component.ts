import { AllRequestsComponent } from './../all-requests/all-requests.component';
import { MeetingDetails } from './../../../Models/meeting-details';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { RequestByEmployee } from 'src/Models/request-by-employee';
import { MAT_DIALOG_DATA, MatDatepickerModule } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/Service/admin.service';

@Component({
  selector: 'app-view-request-details',
  templateUrl: './view-request-details.component.html',
  styleUrls: ['./view-request-details.component.scss'],
})
export class ViewRequestDetailsComponent implements OnInit {

  @Output() valueChange = new EventEmitter();

EmpFirstname:string;
Emplastname:string;
RequestMessege:string;
DocumentName:string;
showAddScheduleCard:boolean=false;
show_Schedule_Done_msg:boolean=false;
success_message:string;

meetingroom:string;

success_message_class:any;

interval:any;
timeLeft: number = 60;

matDatepicker:any;

Requestdetails:FormGroup;





  constructor( private httpservice:AdminService,  private fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: RequestByEmployee) { 

    this.Requestdetails = this.fb.group({
      Candidate_Id: [''],
      Interviewer_Id: [''],
      Date: [''],
      Time: [''],
      
      });

  }

  
    
  

  ngOnInit() {

    this.EmpFirstname=this.data.Emp_First_Name;
    this.Emplastname=this.data.Emp_Last_Name;
    this.RequestMessege=this.data.Request_Message;
    this.DocumentName=this.data.Document_Name;

  }
  funScheduleMeeting()
  {
    this.showAddScheduleCard=true;
  }

  funSelectMeetingRoom(Meetingroom:string)
  {
   this.meetingroom=Meetingroom;
  }

  funAddSchedule()
  {
    this.showAddScheduleCard=false;

    var meetingdetails=new MeetingDetails;
    
    meetingdetails.Emp_Comp_Id=this.data.Emp_Comp_Id;
    meetingdetails.Meeting_Date=this.Requestdetails.controls['Date'].value;
    meetingdetails.Meeting_Time=this.Requestdetails.controls['Time'].value;
    meetingdetails.Request_Id=this.data.Request_Id;
    meetingdetails.Meeting_Room=this.meetingroom;
   
    
    this.httpservice.AddSchedule(meetingdetails).subscribe(data=>{ 

      if(data==1)
      {
        this.show_Schedule_Done_msg=true;
        this.success_message_class='success_message1';
         this.success_message="MEETING SCHEDULED"

        // this.httpservice.FunEventEmitter();
         this.valueChange.emit();


         this.interval = setInterval(() => {
          this.show_Schedule_Done_msg=false;
          
          if(this.timeLeft > 0)
           {
            this.timeLeft--;
          } 
          else
           {
            this.timeLeft = 60;
           }
        },3000)


      }
        else{
          this.show_Schedule_Done_msg=true;
          this.success_message_class='success_message1';
          this.success_message="MEETING NOT SCHEDULED..PLEASE TRY AGAIN..."

          this.interval = setInterval(() => {
            this.show_Schedule_Done_msg=false;
            if(this.timeLeft > 0)
             {
              this.timeLeft--;
            } 
            else
             {
              this.timeLeft = 60;
             }
          },3000)
  

        }

    });

  }

 

}
