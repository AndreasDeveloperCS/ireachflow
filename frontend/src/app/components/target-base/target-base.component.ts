import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { AuthenticationDialogComponent } from 'src/app/dialogs/authentication-dialog/authentication-dialog.component';
import { ValidationDialogComponent } from 'src/app/dialogs/validation-dialog/validation-dialog.component';
import { EmailForm, EmailFormData, FileData } from 'src/app/models/email-form';
import { EmailSenderService } from 'src/app/services/email-sender.service';
import { SearchLogicService } from 'src/app/services/search-logic.service';
import { SpinnnerService } from 'src/app/services/spinnner.service';

@Component({
  selector: 'app-target-base',
  templateUrl: './target-base.component.html',
  styleUrls: ['./target-base.component.scss']
})
export class TargetBaseComponent {

  progress:any = "";
 
  //public capchaKey = environment.RECAPTCHA_KEY_V2;
  public emailFormData: EmailFormData = new EmailFormData();
  
  public inputFileTypes = ['.csv', '.xlsb', '.xls', '.xlsx', '.txt'];

  isSelectedEmailAddressList: boolean = false;

  public isJustSent:boolean = false;
  public reverseTimer:number = 5000;
  public isApplied:boolean = false;

  public emailAddressesFileName = '';

  public get selectedEmailAddressesFileName() {
    return this.emailAddressesFileName == '' || this.emailAddressesFileName == undefined ? 'please select target emails list file' : this.emailAddressesFileName;
  }

  public set selectedEmailAddressesFileName(value) {
    this.emailAddressesFileName = value;
  }

  public get extensions() {
    return `${this.inputFileTypes}`;
  }

  public get isAttachmentExist() {
    return this.emailFormData.attachments.length > 0;
  }


  public emailForm: FormGroup<EmailForm> = new FormGroup<EmailForm> ({
    subject: new FormControl('', [Validators.required]),
    emailText: new FormControl('', [Validators.required]),
    targetAddressList: new FormControl('', [Validators.required]),
    attachments: new FormControl(undefined),
    sourceAddress: new FormControl('', [Validators.required]),
    sourcePassword: new FormControl('', [Validators.required])
  });

  editor = new Editor();
  toolbar: Toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ['link', 'image'],
      ['text_color', 'background_color'],
      ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  emailText: any = '';
  private pw = "FastSenderHermes";

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private emailSenderService: EmailSenderService,
    private matDialog: MatDialog,
    private router: Router,
    private spinnnerService:SpinnnerService,
    private searchLogicService:SearchLogicService
  ) {

    const retreivedPassword = localStorage.getItem('affmailer-login');

    if(retreivedPassword != this.pw){
      const dialogRef = this.matDialog.open(AuthenticationDialogComponent, {
        panelClass: 'signin-fullscreen-dialog',
        // data: signInData,
        disableClose: true,
      });
  
      dialogRef.afterClosed().subscribe(result => {
    
        if(result == this.pw) {
          localStorage.setItem("affmailer-login", result);
        }
        if(result != this.pw)
          this.router.navigate(['main']);
      });
    }
    
    const retreived = localStorage.getItem('affmailer');

    if (retreived != null) {

        const retreivedData = JSON.parse(retreived);

        this.emailFormData.emailInfo.emailText = retreivedData.emailInfo.emailText;
        this.emailFormData.emailInfo.subject = retreivedData.emailInfo.subject;
        this.emailFormData.emailInfo.sourceAddress = retreivedData.emailInfo.sourceAddress;
        this.emailFormData.emailInfo.sourcePassword = retreivedData.emailInfo.sourcePassword;

        this.emailFormData.targetAddressList = retreivedData.targetAddressList;
        this.selectedEmailAddressesFileName = retreivedData.targetAddressList.fileName;
    }

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
   
  }

  ngAfterViewChecked(): void {
   this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    const reportSubscription = this.searchLogicService.getReport(null);
    console.log('reportSubscription', reportSubscription);
    
  }

  onFileSelected(event: any) {
    const inputNode: any = event.srcElement;
    console.log('inputNode', inputNode);
      
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (node: any) => {
        console.log('onload node', node);
        
        this.emailFormData.targetAddressList = {
            file: node.target.result,
            fileInfo: inputNode.files[0],
            fileName: inputNode.files[0].name
        }
        if(this.emailForm.controls.targetAddressList) {
          this.emailForm.controls.targetAddressList.setValue(inputNode.files[0].name);
        }
        
      };

      this.emailAddressesFileName = inputNode.files[0].name;
      this.isSelectedEmailAddressList = this.emailAddressesFileName != undefined && this.emailAddressesFileName != null;
      reader.readAsText(inputNode.files[0]);
    }
  }
  
  removeAttachment(attachment:FileData) {
    this.emailFormData.attachments = this.emailFormData.attachments.filter( (element:any) => { 
      return element.fileInfo.name !== attachment.fileInfo.name; 
    }); 
  }

 async onAttachmentsSelected(event: any) {
    console.log('onAttachmentsSelected', event);
  
    const inputNodes: any = event.srcElement;
    const attachments:FileData[] = [];
    if (typeof (FileReader) !== 'undefined') {
      for (let index = 0; index < inputNodes.files.length; index++) {
        const reader = new FileReader();
        //const attachment:FileData = new FileData();
        reader.readAsArrayBuffer(inputNodes.files[index]);
        reader.onload = (node: any) => {
          console.log('onload node', node);
          
           const attachment:FileData = {
               file: node.target.result,
               fileInfo: inputNodes.files[index],
               fileName: inputNodes.files[index]?.name
           }
     
          attachments.push(attachment);
          if(this.emailForm.controls.attachments) {
            this.emailForm.controls.attachments.setValue(inputNodes.files[index]?.name);
          }
          return node.target.result;
        }
        reader.onloadend = (node: any) => {

          console.log('onload node', node);

          const attachment:FileData = {
            file :  node.target.result,
            fileInfo: inputNodes.files[index],
            fileName : inputNodes.files[index]?.name
          }
          attachment.fileName = inputNodes.files[index].name;
          this.emailFormData.attachments.push(attachment);
        }
      }

      console.log('attachments', attachments);
      // attachments.forEach(item => {
      //   this.emailFormData.attachments.push(item);
      // });
      console.log('attachments', this.emailFormData.attachments);
    }
  }

  async executePromisesInSequence(promises:Promise<any>[]) {
    if (promises.length === 0) {
        return;
      }
      const promise = promises.shift(); // Get the first task to be executed
      if(promise) {
        await promise; // Execute the task and wait for it to complete
      }
   
      await this.executePromisesInSequence(promises); // Recursively call the function with the remaining tasks
  }

  async onApply() {

    if(this.isJustSent) {
      return;
    }
  
    if(!this.emailForm.valid) {

      let invalidFields:{field:string, message:string}[] = [];
      if(!this.emailForm.controls.subject?.valid) {
        invalidFields.push({field: "Email Subject", message: "Please add subject of email"});
      }
      if(!this.emailForm.controls.emailText?.valid) {
        invalidFields.push({field: "Email Content", message: "Please add content of email in html format"});
      }
      if(!this.emailForm.controls.targetAddressList?.valid) {
        invalidFields.push({field: "Target Address List", message: "Please select target email addresses list in csv or txt format listed in column"});
      }
      if(!this.emailForm.controls.sourceAddress?.valid) {
        invalidFields.push({field: "Email Box Login", message: "Please define Login from email box"});
      }
      if(!this.emailForm.controls.sourcePassword?.valid) {
        invalidFields.push({field: "Email Box Password", message: "Please define Password from email box"});
      }
    
      
      const dialogRef = this.matDialog.open(ValidationDialogComponent, {
        panelClass: 'signin-fullscreen-dialog',
        data: invalidFields,
        disableClose: true,
      });
  
      dialogRef.afterClosed().subscribe(result => {
     
      });
    }

    if (this.emailForm.valid) {
     
      try {

        if (!this.emailFormData.targetAddressList?.fileInfo) {
          return;
        }
       
        this.isApplied = true;

        localStorage.setItem("affmailer", JSON.stringify(this.emailFormData));

        const emailSendingResult = this.emailSenderService.sendEmail(this.emailFormData);
        this.spinnnerService.showSpinner.emit(true);
        this.isJustSent = true;
        this.reverseTimer = 5000;
        setTimeout(()=> {
          this.spinnnerService.showSpinner.emit(false);
          this.isJustSent = false;        
        }, 5000);

        setInterval(()=> {
            console.log(this.reverseTimer);
            this.reverseTimer -= this.reverseTimer > 0 && this.isJustSent ? 1000: 0;
        }, 1000);
      //  while(this.isJustSent) {
      //   setInterval(()=> {
      //     console.log(this.reverseTimer);
      //     this.reverseTimer -= 1000;
      //   }, 1000);
      //  }
        
        // emailSendingResult.pipe(
        //   tap((msg) => {
           
        //   }),
        //   catchError((err: any, caught: Observable<any>) => {
        //     console.error('err', err);
        //     return caught;
        //   }));

        // emailSendingResult.subscribe((result:any) => {
        //   console.log('result', result);
        //   this.isJustSent = true;
        //   setTimeout(() => {
        //     this.isJustSent = false
        //     //this.resetContactUsDataForm(contactForm);
        //   }, 7000);
        // });

      } catch (ex) {
        console.error('upload all', ex);
      }
    }
  }

  onCancel(): void {
    //this.dialogRef.close();
  }
}
