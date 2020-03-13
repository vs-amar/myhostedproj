import { Router } from '@angular/router';
import { Documents } from './../../../Models/documents';
import { Component, OnInit, Injectable, ElementRef, Inject, forwardRef, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FileUploadInputFor, MatFileUploadQueue } from 'angular-material-fileupload';
import { AdminService } from 'src/Service/admin.service';


@Component({
  selector: 'app-add-new-document',
  templateUrl: './add-new-document.component.html',
  styleUrls: ['./add-new-document.component.scss']
})



export class AddNewDocumentComponent implements OnInit {


  documentType:any;
  AllEmployee:any;
  show_emp_dropdown:boolean=false;
  show_success_message:boolean=true;
  success_message:any;
  h3_success_message:any;

  timeLeft: number = 60;
  interval:any;

  privacytype = new FormControl('', [Validators.required]);
  documenttype= new FormControl('', [Validators.required]);
  employeename= new FormControl('', [Validators.required]);
  
  private _queue: any = null;
  private _element: HTMLElement;
  UploadFiledata = [];
  filename=[];

  docprivacy:string;
  doctype:string;
  empid:string;


  constructor(private httpservice:AdminService,private router:Router) { 
    
  }

  @ViewChild('myInput', {static: true})
  myInputVariable: ElementRef;

  ngOnInit() {

      this.httpservice.getDocumentTypes().subscribe(data=>{ 
      
        this.documentType=JSON.parse(JSON.stringify(data));
       
      });


      this.httpservice.getallemplyee().subscribe(data=>{ 
      
        this.AllEmployee=JSON.parse(JSON.stringify(data));
      });
    

    
        this.h3_success_message='h3_success_message1';

        
  }
  
  fun_Privte_Selected(privacytype:string)
  {
     this.docprivacy=privacytype;
   if(privacytype=="private")
   {
    this.show_emp_dropdown=true;
   }
   else{
     this.show_emp_dropdown=false;
   }

  }
  fun_Doc_type_Selected(documenttype:string)
  {
    this.doctype=documenttype;
    console.log();
  }
  fun_Emp_Selected(EmpId:string)
  {
    this.empid=EmpId;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                //  console.log(event.target.result);
                   this.UploadFiledata.push(event.target.result); 
                  
                }

                reader.readAsDataURL(event.target.files[i]);
                let file = event.target.files[i];
                let fileName = file.name;
                this.filename.push(fileName);
        }
    }
    // console.log(this.UploadFiledata);
  }
  removeFile(index:number){

          this.UploadFiledata.splice(index, 1);
          this.filename.splice(index,1);
          
          console.log(this.UploadFiledata);

  }
  
  Upload_New_Document()
  {

          //console.log("doc"+this.doctype);

          if( this.doctype==undefined || this.docprivacy==undefined)
          {
          
          // console.log("hi");
              this.privacytype.markAllAsTouched();
                  this.documenttype.markAllAsTouched();
                this.employeename.markAllAsTouched();
          }
          else{

              if(this.UploadFiledata.length>0 || this.filename.length>0)
              {

                var documentdata=new Documents();

                documentdata.Document_Name=JSON.stringify(this.filename);
                documentdata.Document_Data=JSON.stringify(this.UploadFiledata);
                documentdata.Document_Privacy= this.docprivacy
                
                documentdata.Document_Type=this.doctype;
                documentdata.Emp_Comp_Id=this.empid;
              
                this.httpservice.Upload_Document(documentdata).subscribe((data)=>{   
              
                 // console.log(data);
              
                  if(data==1)
                  {
                    this.show_success_message=true;
                    this.success_message= ""+this.filename.length+"   FILE UPLOADED SUCCESSFULLY.. ";
                    this.h3_success_message='h3_success_message1';
                  
              
                    this.filename=[];
                    this.UploadFiledata=[];
              
                      this.privacytype.reset();
                      this.documenttype.reset();
                      this.employeename.reset();
                      this.doctype=undefined;
                      this.docprivacy=undefined;
                  
                    this.interval = setInterval(() => {

                    
                      this.show_success_message=false;
                      
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
                  else
                  {
                    this.show_success_message=true;
                    this.success_message= "SOMETHING WENT WROUNG ..PLEASE TRY AGAIN.... ";
                    this.h3_success_message='h3_success_message2';
                  
                    this.privacytype.reset();
                    this.documenttype.reset();
                    this.employeename.reset()
              
                    this.filename=[];
                    this.UploadFiledata=[];
              
                    this.interval = setInterval(() => {
                    
                      this.show_success_message=false;
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
              else{
                this.show_success_message=true;
                this.success_message= "PLEASE SELECT THE FILE.... ";
                this.h3_success_message='h3_success_message2';

                this.interval = setInterval(() => {
                    
                  this.show_success_message=false;
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
          }
   
  }
  Back()
  {
    this.router.navigate(['/AllComponent/AllDocuments'])
  }
  
   
  

 


}
