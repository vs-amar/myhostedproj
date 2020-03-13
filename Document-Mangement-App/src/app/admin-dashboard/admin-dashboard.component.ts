import { logging } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from 'src/Service/admin.service';
import { ScheduledMeetingsComponent } from './scheduled-meetings/scheduled-meetings.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';
import {MatSidenav} from "@angular/material";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  documentType:any;
   
  AllDocClick:boolean=false;
  AllEmolyeeClick:boolean=false;
  AllRequestClick:boolean=false;
  ScheduledMeetingClick:boolean=false;
 
  nav_item_AllDoc:any;
  nav_item_Emp:any;
  nav_item_Req:any;
  nav_item_Schedule:any;
 
  ScheduledMeetingCount:any;
  NewRequestCount:number;

  show_Badge:boolean=false;

  AllRequets:any=[];
  scheduledMeetings:any=[];

  AdminName:any;

  routeurl:any;

  @ViewChild('sidenav',{static: true}) sidenav: MatSidenav;
  AdminEmail: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      if (event.target.innerWidth < 500) {
        this.sidenav.opened=false;
      }
  }


  constructor(private router:Router,private httpservice:AdminService,private service:ApiService,private _pushNotificationService: PushNotificationService) { }
  private updateSubscription: Subscription;

  ngOnInit() {

    this._pushNotificationService.requestPermission();

      //console.log("==>"+this.router.url);
      
      this.routeurl=this.router.url.split('/');

      //console.log(this.routeurl[2]);

      if(this.routeurl[2]=="AllRequests")
      {
        this.nav_item_AllDoc='nav_item_AllDoc1'
        this.nav_item_Emp='nav_item_Emp1'
        this.nav_item_Req='nav_item_Req2'
        this.nav_item_Schedule='nav_item_Schedule1'
        this.AllDocClick=false;
        this.AllEmolyeeClick=false;
        this.AllRequestClick=true;
        this.ScheduledMeetingClick=false;
    
      }

      else if(this.routeurl[2]=="AllEmployee")
      {
        this.nav_item_AllDoc='nav_item_AllDoc1'
        this.nav_item_Emp='nav_item_Emp2'
        this.nav_item_Req='nav_item_Req1'
        this.nav_item_Schedule='nav_item_Schedule1'
        this.AllDocClick=false;
        this.AllEmolyeeClick=true;
        this.AllRequestClick=false;
        this.ScheduledMeetingClick=false;
        
      }

     else if(this.routeurl[2]=="AllMeetingSchedules")
      {
        this.nav_item_AllDoc='nav_item_AllDoc1'
        this.nav_item_Emp='nav_item_Emp1'
        this.nav_item_Req='nav_item_Req1'
        this.nav_item_Schedule='nav_item_Schedule2'

        this.AllDocClick=false;
        this.AllEmolyeeClick=false;
        this.AllRequestClick=false;
        this.ScheduledMeetingClick=true;


      }

    else if(this.routeurl[2]=="AllDocuments")
      {
        this.nav_item_AllDoc='nav_item_AllDoc2'
        this.nav_item_Emp='nav_item_Emp1'
        this.nav_item_Req='nav_item_Req1'
        this.nav_item_Schedule='nav_item_Schedule1'
        this.AllDocClick=true;
        this.AllEmolyeeClick=false;
        this.AllRequestClick=false;
        this.ScheduledMeetingClick=false;
        
      }
      
      else if(this.routeurl[2]=="AddNewDocument")
      {
        this.nav_item_AllDoc='nav_item_AllDoc2'
        this.nav_item_Emp='nav_item_Emp1'
        this.nav_item_Req='nav_item_Req1'
        this.nav_item_Schedule='nav_item_Schedule1'
        this.AllDocClick=true;
        this.AllEmolyeeClick=false;
        this.AllRequestClick=false;
        this.ScheduledMeetingClick=false;
        
      }

      else if(this.routeurl[2]=="PerticularDoc")
      {
        this.nav_item_AllDoc='nav_item_AllDoc2'
        this.nav_item_Emp='nav_item_Emp1'
        this.nav_item_Req='nav_item_Req1'
        this.nav_item_Schedule='nav_item_Schedule1'
        this.AllDocClick=true;
        this.AllEmolyeeClick=false;
        this.AllRequestClick=false;
        this.ScheduledMeetingClick=false;
        
      }
      


       this.updateSubscription = interval(1000).subscribe( 
      (val) => { 

      //  OldRequestCount=

     // this.NewRequestCount=localStorage.getItem('RequestCount');
      this.ScheduledMeetingCount=localStorage.getItem('ScheduledMeetingCount');
      });

    this.updateSubscription = interval(1000).subscribe( 
      (val) => { 
       
        this.httpservice.getallRequest().subscribe(data=>{ 

          this.AllRequets=JSON.parse(JSON.stringify(data));

             if(this.NewRequestCount<this.AllRequets.length)
         {
            this.NewRequestCount=this.AllRequets.length;
      
            if(this.routeurl[1]=="AllComponent")
            {  
              console.log('hii');
            this.fun_PushNotification(this.AllRequets.Related_Document_Id);
            }
            
         }
         else{
          this.NewRequestCount=this.AllRequets.length;
         }

        
        });

      });
    

      // this.updateSubscription = interval(1000).subscribe( 
      //   (val) => { 

        this.httpservice.getallSchedules().subscribe(data=>{ 
    
          this.scheduledMeetings=JSON.parse(JSON.stringify(data));
        
            //this.show_Badge=true;
            this.ScheduledMeetingCount=this.scheduledMeetings.length;
    
             
        });

      // });
    


   
      var Admindata=JSON.parse(atob(localStorage.getItem('ADMINDT')));
      this.AdminEmail=Admindata.Admin;
      this.AdminName=Admindata.Admin_name;

      
  }


  fun_PushNotification(doc:string) {
    const title = 'New Request From Employee';
    const options = new PushNotificationOptions();
    options.icon="../assets/NotificationIcon.png";
    options.noscreen=true;
    options.sticky=true;
    //options.lang='en-usa';
    options.dir='ltr';
   // options.data={name:doc};


    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
       // console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 3000);
      }
      if (notif.event.type === 'click') {
       // console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        //aconsole.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
}




  funAllDoc()
  {
   this.AllDocClick=true;
   this.AllEmolyeeClick=false;
   this.AllRequestClick=false;
   this.ScheduledMeetingClick=false;
   this.nav_item_AllDoc='nav_item_AllDoc2'
   this.nav_item_Emp='nav_item_Emp1'
   this.nav_item_Req='nav_item_Req1'
   this.nav_item_Schedule='nav_item_Schedule1'

 // this.router.navigate(['']);

  }

  funEmployee()
  {
    this.AllDocClick=false;
    this.AllEmolyeeClick=true;
    this.AllRequestClick=false;
    this.ScheduledMeetingClick=false;
    this.nav_item_AllDoc='nav_item_AllDoc1'
    this.nav_item_Emp='nav_item_Emp2'
    this.nav_item_Req='nav_item_Req1'
    this.nav_item_Schedule='nav_item_Schedule1'
   // this.router.navigate(['AllEmployee']);

  }

  funAllRequests()
  {
    this.AllDocClick=false;
    this.AllEmolyeeClick=false;
    this.AllRequestClick=true;
    this.ScheduledMeetingClick=false;
    this.nav_item_AllDoc='nav_item_AllDoc1'
    this.nav_item_Emp='nav_item_Emp1'
    this.nav_item_Req='nav_item_Req2'
    this.nav_item_Schedule='nav_item_Schedule1'

    //this.router.navigate(['AllRequests']);
    
  }


  funScheduledMetting()
  {
    this.AllDocClick=false;
    this.AllEmolyeeClick=false;
    this.AllRequestClick=false;
    this.ScheduledMeetingClick=true;
    this.nav_item_AllDoc='nav_item_AllDoc1'
    this.nav_item_Emp='nav_item_Emp1'
    this.nav_item_Req='nav_item_Req1'
    this.nav_item_Schedule='nav_item_Schedule2'

  }
  logout()
  {

    //localStorage.setItem('isLoggedInAdmin','false');    
   // localStorage.removeItem('Admin');  
    localStorage.removeItem('ADMINDT');  
    this.router.navigate(['/login']);    
   
  }

  funadminInfo()
  {
   
    
    //this.Name="Amar",this.Admin_Id="ADM1223",this.Admin_type="Support";
   

  }

}
