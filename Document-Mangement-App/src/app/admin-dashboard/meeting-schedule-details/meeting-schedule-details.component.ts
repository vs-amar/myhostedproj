import { AdminService } from 'src/Service/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MeetingDetails } from 'src/Models/meeting-details';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-meeting-schedule-details',
  templateUrl: './meeting-schedule-details.component.html',
  styleUrls: ['./meeting-schedule-details.component.scss']
})
export class MeetingScheduleDetailsComponent implements OnInit {

  constructor(private httpservice:AdminService, @Inject(MAT_DIALOG_DATA) public data: MeetingDetails) { }

  ngOnInit() {
  }

  YesClicked()
  {

    this.httpservice.UpdateMeetingStatus(this.data.Meeting_Id).subscribe(data=>{ 
     
      if(data=="true")
      {
       
      
        
      }
      else
      {
        
      }

    });


  }


}
