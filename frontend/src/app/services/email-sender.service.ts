import { Injectable, Injector } from '@angular/core';
import { HttpService } from './http.service';
import { EmailFormData, FileData } from '../models/email-form';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService extends HttpService{
  public progress: number = 0;
  message: any;
  fileInfo: any;
  public currentFile: any;

  constructor(injector: Injector) {
    super(injector);
  }

   sendEmail(data: EmailFormData):any {
    if (!data) {
      return;
    }
    
    const tartgetUrl = `${environment.apiUrl}email/send`;
   
    try {
  
      const jsonData = JSON.stringify(data.emailInfo);
    
      
      let formData = new FormData();
      formData.append("info", jsonData);
      
      //formData.append("targetEmailsList", data.targetAddressList.fileInfo, data.targetAddressList.fileInfo.name);
      formData.append("files[]", data.targetAddressList.fileInfo, data.targetAddressList.fileInfo.name);
      if(data.attachments.length > 0) {
        for (let index = 0; index <  data.attachments.length; index++) {
          const targetFile:FileData = data.attachments[index];

          if(targetFile && targetFile.fileInfo) {
            formData.append('files[]', targetFile.fileInfo, targetFile.fileName)
          }        
        }
      }

      console.log('emailSentResult', formData);
      const emailSentResult = this.http.post(tartgetUrl, formData,
      {
        // headers: {
        //   "Content-Type": "multipart/form-data"
        // },
        reportProgress:true,
        responseType:"json"
         //withCredentials: false
      });

      emailSentResult.pipe(map((err)=> {
         console.log('emailSentResult', err);        
      }));

      emailSentResult.subscribe((event: any) => {
        console.log('emailSentResult', event);
        
        if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            //this.fileInfo = this.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

      return emailSentResult;

    } catch (ex) {
  
    }
  }
  getAttachmentsPayload(attachments: FileData[]):File[] {
    const attachmentsPayload:File[] = [];

    attachments.forEach((item) => {
      if(item.file != undefined) {
        attachmentsPayload.push(item.file);
      }
    });
    return attachmentsPayload;
  }
}
