import { Subscription, interval } from 'rxjs';
import { ViewRequestDetailsComponent } from './../view-request-details/view-request-details.component';
import { AdminService } from 'src/Service/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserData } from '../all-employee/all-employee.component';
import { DatePipe } from '@angular/common';
import { ConfermationDilogComponent } from '../confermation-dilog/confermation-dilog.component';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss'],
 // template:'<app-view-request-details (valueChange)="valueChange()"> </app-view-request-details>'
})
export class AllRequestsComponent implements OnInit {
  AllRequets:any;
newdate:any;
currentDate:any

RequestCount:number=0;

  displayedColumns: string[] = ['new','Emp_Id','Emp_Name','Document', 'Date','action'];
  


    
    dataSource: MatTableDataSource<UserData>;
   

  constructor(private httpservice:AdminService, private datePipe:DatePipe,private dialog:MatDialog) { }

  private updateSubscription:Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 

  ngOnInit() {

    this.newdate=new Date();
    this.currentDate = this.datePipe.transform(this.newdate, 'dd-MM-yyyy ');

       //console.log(this.currentDate);





        this.httpservice.getallRequest().subscribe(data=>{ 

          this.AllRequets=JSON.parse(JSON.stringify(data));


          this.dataSource= new MatTableDataSource(this.AllRequets);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          localStorage.setItem('RequestCount',this.AllRequets.length);
          for(var i=0;i<this.AllRequets.length;i++)
          {

           // var cr =this.datePipe.transform(new Date(this.AllRequets[i].Request_Date), 'dd-MM-yyyy');
          // console.log(cr);
          }   
     });

              // this.AllRequets=[
              //   {Emp_Comp_Id:"EMPOO1" ,Emp_First_Name:"AMAR",Emp_Last_Name:"JADHAV",Document:"Mediclaim forms & links",Request_Date:"31-01-2020 00:00:00",Requst_status:"1"},
              //   {Emp_Comp_Id:"EMPOO2" ,Emp_First_Name:"PRASAD",Emp_Last_Name:"BIDWAI",Document:"Mediclaim forms & links",Request_Date:"30-01-2020 00:00:00",Requst_status:"1"},
                
              //   ]
}


applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

funViewRequestDetails(empname:string,emplastname:string,docname:string,requestmessage:string,emp_com_id:string,request_id:string)
{
  const dialogRef = this.dialog.open(ViewRequestDetailsComponent, {
    width: 'auto',
    height:'auto',  
    data: {Request_Id:request_id , Emp_Comp_Id:emp_com_id, Emp_First_Name: empname, Emp_Last_Name: emplastname,Document_Name:docname,Request_Message:requestmessage}

 });

 dialogRef.afterClosed().subscribe(data=>{

  this.httpservice.getallRequest().subscribe(data=>{ 

    this.AllRequets=JSON.parse(JSON.stringify(data));


    this.dataSource= new MatTableDataSource(this.AllRequets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    localStorage.setItem('RequestCount',this.AllRequets.length);

    for(var i=0;i<this.AllRequets.length;i++)
    {

     // var cr =this.datePipe.transform(new Date(this.AllRequets[i].Request_Date), 'dd-MM-yyyy');
    // console.log(cr);
    }   
  });
      
 });

}

// compareDates(datetocheck:string,request_status:string)
// {
    
//   //console.log(datetocheck);

//   this.currentDate = this.datePipe.transform(this.newdate, 'MM-dd-yyyy');
 

//   let newdate= this.datePipe.transform(datetocheck, 'MM-dd-yyyy');

//    console.log(this.currentDate+"==>"+newdate);

//    if(this.currentDate==newdate && request_status=="1")
//    {
    

//     // localStorage.setItem('RequestCount',(this.RequestCount++).toString());
//      return true;
//    }

//    else
//    {
//     localStorage.setItem('RequestCount',(1).toString());
//     return false;
//    }  

//    }

}
