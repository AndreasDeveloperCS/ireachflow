/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ParsingHelper } from 'src/helpers/parsing.helper';
import {
  DkimInfo,
  EmailData,
  EmailInfo,
  FileData,
} from 'src/models/email.model';
import { EmailLoggingService } from 'src/services/email-logging/email-logging.service';
import { resolve } from 'dns/promises';

var nodemailer = require('nodemailer');
var inlineBase64 = require('nodemailer-plugin-inline-base64');
var fs = require('fs');
var path = require("path");

@Injectable()
export class EmailService {
    testingEmail = "andrewdevelopercs@gmail.com";
    pixelUrl = "http://localhost:4000/api/asset";
    pixelUrlServer = "https://ireachflow.com/api/asset";
    dkimInfo:DkimInfo = new DkimInfo();

    constructor(public parsingHelper:ParsingHelper, public emailLoggingService: EmailLoggingService) {
        console.log('Welcome to EmailService');
    }
    
    public sendMessage(transporter:any, message: any):any {
      let sendingResult:any;

      const sendmailCallback = (err, info) => {

        if (err) {
          console.log('err sendMessage', err);
          sendingResult = err;
       
        } else {

          //console.log('info sendMessage', info);

          const emailModel = this.parsingHelper.covertJsonIntoEntity(info);

          //console.log('emailModel', emailModel);

          const savingResult = this.emailLoggingService.saveEmailResponseLog(emailModel);

          //console.log('savingResult', savingResult);

          sendingResult = info; 

          resolve(info);
        }
      }

      transporter.sendMail(message, sendmailCallback);
      //console.log('sendingResult', sendingResult);
      
      return sendingResult;
    }

    public getMessage(emailInfo:EmailInfo, targetAddress:string, attachmentsData?:File []) {

        //console.log('emailInfo', emailInfo);
        const id = uuidv4();
        const messageId = `<${id}@${this.parsingHelper.getHostName(emailInfo.sourceAddress)}>`;

        //console.log('messageId', targetAddress, messageId);

        const attachments = attachmentsData != undefined && attachmentsData.length > 0 ? this.getAttachments(attachmentsData) : [];

        //console.log('logo image', this.getTrackingPicxel(emailInfo.isProd, messageId));

        const message = {
          priority: 'high',
          messageId: messageId,
          from: emailInfo.sourceAddress,
          to: targetAddress,
          bcc: this.testingEmail,
          subject: emailInfo.subject,
          html:  emailInfo.emailText + this.getTrackingPicxel(emailInfo.isProd, messageId),
          attachments: attachments
        };

        return message;
    }

  getTrackingPicxel(isProd:boolean, messageId: string) {

    if(isProd) {
      return `<p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYGWP4////fwAJ+wP93BEhJAAAAABJRU5ErkJggg=="></p>
      <p><img src="${this.pixelUrlServer}/${messageId}" width="1" height="1" ></p>`;
    } else {
      return `<p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYGWP4////fwAJ+wP93BEhJAAAAABJRU5ErkJggg=="></p>
      <p><img src="${this.pixelUrl}/${messageId}" width="1" height="1" ></p>`;
    }
   
    // return `<p><img src="${this.pixelUrl}${messageId}" width="1" height="1" ></p>`;
  }

  getAttachments(attachmentsContent: any[]): any[] {
    const attachments: any[] = [];
    attachmentsContent.forEach((file) => {
      const attachmentItem = {
        filename: file.originalname, //path.parse(file.filename)?.base,
        path: file.path,
      };
      attachments.push(attachmentItem);

     });
        return attachments;
    }

    readDkim(filePath:string) {

     const fileContent = fs.readFileSync(filePath, 'utf-8', function (err, fileContent) {
        if (err) {
          console.error('readDkim', err);
          throw err;
        }
      });
      const corrected = JSON.stringify(fileContent);
      this.dkimInfo = JSON.parse(corrected);
    }

  getTransporter(login: string, password: string) {
    const hostName = this.parsingHelper.getHostName(login);
    this.getDkim(hostName);
    if (this.dkimInfo) {
      return this.sendWithDkim(hostName, login, password);
    } else {
      return this.sendWithoutDkim(hostName, login, password);
    }
  }

  sendWithoutDkim(hostName:string, login:string, password:string) {
      let nodemailerTransport = nodemailer.createTransport({
        host: hostName,
        port: 587,
        secure: false,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0",
          'Pragma': "no-cache"
        },
        auth: {
          user: login,
          pass: password,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      nodemailerTransport.use('compile', inlineBase64({cidPrefix: 'affmailerPrefix_'}));

      return nodemailerTransport;
  }

  getDkim(hostName: string) {
    console.log('getDkim', hostName );
    
    try {
      const dkimPath = path.join('dkim', `${hostName}.private.json`);
      this.readDkim(dkimPath);
      //console.log('dkimInfo', this.dkimInfo);

    } catch (ex) {
      console.log(ex);
    }
  }

  sendWithDkim(hostName:string, login:string, password:string) {
      let nodemailerTransport = nodemailer.createTransport({
        host: hostName,
        port: 587,
        secure: false,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0",
          'Pragma': "no-cache"
        },
        auth: {
          user: login,
          pass: password,
        },
        dkim: {
          domainName: hostName
          , keySelector: 'DKIM1'
          , privateKey: this.dkimInfo.privateKey
          , cacheDir: 'dkim'
          , cacheTreshold: 1024 * 1024
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      nodemailerTransport.use('compile', inlineBase64({cidPrefix: 'affmailerPrefix_'}));

      return nodemailerTransport;
    }
  }