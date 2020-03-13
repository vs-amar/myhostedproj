import { DocshareListComponent } from './../docshare-list/docshare-list.component';
import { ConfermationDilogComponent } from './../confermation-dilog/confermation-dilog.component';
import { AdminService } from './../../../Service/admin.service';
import { Routes, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs';
import { Timeouts } from 'selenium-webdriver';
import { timeout } from 'q';
import { MatDialog, TooltipPosition } from '@angular/material';

@Component({
  selector: 'app-perticular-document',
  templateUrl: './perticular-document.component.html',
  styleUrls: ['./perticular-document.component.scss']
})
export class PerticularDocumentComponent implements OnInit {
  [x: string]: any;

  Perticular_documents:any;
  doctype:any;
  show_success_msg:boolean=false;
  success_message:string;
  doctypeNew:string;
  topmargin:number;
 
  DocShareCount:any=[];
  DocShareEmpList:any;
  documentData:any;
  positionOptions: TooltipPosition[]

  constructor(private router:Router,private httpservice:AdminService,private dialog:MatDialog ) { }
  private updateSubscription: Subscription;

  
 
  ngOnInit() {
       
    this.doctype= localStorage.getItem('doctype');

  //   console.log("len==>"+this.doctype.length);
  //   if(this.doctype.length>10)
  //   {
  //     this.doctypeNew=this.doctype.substring(0,25)
  //   }
  //  else{
  //   this.doctypeNew=this.doctype;
  //  }

    // this.updateSubscription = interval(1000).subscribe( 
    //   (val) => { 
        this.httpservice.getperticularDoc(this.doctype).subscribe(data=>{ 
          this.Perticular_documents=JSON.parse(JSON.stringify(data));
         // console.log("in Second")
        // console.log(this.Perticular_documents);
        });
   // }
//);


    
  
      
   // console.log(history.state.doctype);

   
    // this.documentType=[
    //   {Document_Type_Id:"1",Dcument_Type_Name:"Associate enabler"},
    //   {Document_Type_Id:"2",Dcument_Type_Name:"Investment declaration"},
    //   {Document_Type_Id:"3",Dcument_Type_Name:"Mediclaim terms & conditions"},
    //   {Document_Type_Id:"3",Dcument_Type_Name:"Mediclaim terms & conditions"},
     
    //   ];
  }

  // ShowFile(fname:string,fdata:string)
  //   {
  //    //  console.log(fdata)

  //     const dialogRef = this.dialog.open(ViewDocumentComponent, {
  //       width: '800px',
  //       height:'1000px',  
  //       panelClass:'custom-dialog-container',
  //       data: {Document_Name:fname , Document_Data:fdata, }
  
  //    });
  //   } 
  Download_File(filename:string,filedata:string)
  {
     // console.log(filename+"==>"+filedata);
      const linkSource = filedata;
        const downloadLink = document.createElement("a");
        const fileName = filename;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
  }

  Delete_Document(docname:string,docid:string):void
  {
    const dialogRef = this.dialog.open(ConfermationDilogComponent, {
      width: 'auto',
      height:'auto', 
      data: {Document_Name: docname, Document_Id: docid}
    
   });

  dialogRef.afterClosed().subscribe(data=>{
    this.httpservice.getperticularDoc(this.doctype).subscribe(data=>{ 
      this.Perticular_documents=JSON.parse(JSON.stringify(data));
    //  console.log(data);
    });
  })

  }

  Share_Document(index:string,docid:string,docname:string)
  {
    var move = document.getElementById('list_item');
    var style = window.getComputedStyle(move, null);
 
    var topmargin=Number(index);
   // console.log(index)
    if(topmargin==0)
    {
      //console.log(topmargin);
      topmargin=topmargin+8;
      var newtopmargin=String(topmargin)+'%';
    }
    else{
      topmargin=topmargin+8+topmargin+(topmargin+topmargin);
    }
    var newtopmargin=String(topmargin)+'%';

     //console.log(newtopmargin);
  //  alert(style.marginLeft+""+style.marginTop+""+style.marginRight+""+style.marginBottom);
    const dialogRef = this.dialog.open(DocshareListComponent, {
      width: '300px',
      height:'400px',  
      data: {Document_Id:docid , Document_Name:docname,},
      position:{top:newtopmargin,left:'auto'}
  
   });

  }

  Back()
  {
    this.router.navigate(['/AllComponent/AllDocuments'])
  }

}
