import { AdminService } from 'src/Service/admin.service';
import { Documents } from './../../../Models/documents';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confermation-dilog',
  templateUrl: './confermation-dilog.component.html',
  styleUrls: ['./confermation-dilog.component.scss']
})
export class ConfermationDilogComponent implements OnInit {
  doctype: string;

  constructor(private httpservice:AdminService, public dialogRef: MatDialogRef<ConfermationDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Documents) { }

  ngOnInit() {

  }

  YesClicked()
  {

    this.doctype= localStorage.getItem('doctype');

    this.httpservice.deleteDocument(this.data.Document_Name,this.data.Document_Id).subscribe(data=>{ 

      
      // this.httpservice.getperticularDoc(this.doctype).subscribe(data=>{ 
      //  // this.documentType=JSON.parse(JSON.stringify(data));
      // //  console.log(data);
      // });

      // this.httpservice.getperticularDoc(this.doctype).subscribe(data=>{ 
      //  // this.documentType=JSON.parse(JSON.stringify(data));
      // //  console.log(data);
      // });
     

      if(data=="true")
      {
       
      
        
      }
      else
      {
        
      }

    });


  }

  CancelClicked()
  {


  }

}
