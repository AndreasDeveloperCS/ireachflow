import { AbstractControl } from "@angular/forms";
import { environment } from "src/environments/environment";

export class EmailForm {
    subject?: AbstractControl<any, any>;
    emailText?: AbstractControl<any, any>;
    targetAddressList?: AbstractControl<any, any>;
    attachments?: AbstractControl<any, any>;
    sourceAddress?: AbstractControl<any, any>;
    sourcePassword?: AbstractControl<any, any>;
}

export class EmailFormData {
    isProd:boolean = environment.production;
    emailInfo:EmailInfo = new EmailInfo();
    targetAddressList:{  file?: File; fileInfo?: any; fileName?: any; } = {};
    attachments:FileData[] = [];
}

export class EmailInfo {
    isProd:boolean = environment.production;
    subject:string = '';
    emailText:string = '';
    sourceAddress:string = '';
    sourcePassword:string = '';
}

export class FileData { 
    file?: File;
    fileInfo?: any; 
    fileName?: string;
};  

export class Envelope extends Document {
    from: string = '';
    to: string[] = [];
}

export class Email {
  messageId: string = '';
  response: string = '';
  envelope: Envelope = new Envelope();
  mainSourceAddress: string = '';
  mainTargetAddress: string = '';
  accepted: string [] = [];
  rejected: string [] = [];
  ehlo: string [] = [];
  envelopeTime: number = 0.0;
  messageTime: number  = 0.0;
  messageSize: number = 0.0;
  isOpened: boolean = false;
  emailSentDate?: Date;
  isOpenedDate?: Date;
}
