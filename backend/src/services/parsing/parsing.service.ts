import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { ParsingHelper } from 'src/helpers/parsing.helper';
import { EmailInfo } from 'src/models/email.model';
import { EmailService } from 'src/services/email/email.service';
const fs = require('fs');
const { parse } = require("csv-parse");
const validator = require('email-validator');
var dataCsvResult :string[] = [];
// var emailServiceGlobal : any;
@Injectable()
export class ParsingService {
    
    dataResult :string[] = [];
    testingEmail = "andrewdevelopercs@gmail.com";

    constructor(public parsingHelper:ParsingHelper, public emailService:EmailService){
        //emailServiceGlobal = emailService;
    }

    getParsedTargetEmailList(emailInfo:EmailInfo, targetEmailsList: Express.Multer.File, attachments:Array<any>):string[] {

        const fileName = targetEmailsList.filename;
        const path = targetEmailsList.path;
        const extension = this.parsingHelper.getExtension(fileName);
        let data:string[] = this.getDataFromCsv(path, emailInfo, attachments);
     
        return data;
    }
   
    getDataFromCsv(filenName:string, emailInfo:EmailInfo, attachments:Array<any>):string[]{
      
        const options = { header: false };

        const csvData = fs.readFileSync(filenName, 'utf-8', { options: options });
        const addressesCollection = csvData.split('\r\n');
        console.log(addressesCollection);
        //console.log('csvData', csvData);

        
        const transporter = this.emailService.getTransporter(emailInfo.sourceAddress, emailInfo.sourcePassword);

        const message = this.emailService.getMessage(emailInfo, this.testingEmail, attachments);

        const result = this.emailService.sendMessage(transporter, message);
        setTimeout(()=>{
            console.log('waiting a couple seconds', this.testingEmail, Date());
        }, 2000);

        for (let i = 1; i < addressesCollection.length; i++) {
            const targetAddress = addressesCollection[i];
            setTimeout(() => {
                console.log('waiting a couple seconds', targetAddress, Date());
            }, i * 2000);
            const interval = setTimeout(() => {
              
                const transporter = this.emailService.getTransporter(emailInfo.sourceAddress, emailInfo.sourcePassword);
                const message = this.emailService.getMessage(emailInfo, targetAddress, attachments);
                const result = this.emailService.sendMessage(transporter, message);
                console.log('time inside of timeout', interval, targetAddress,  Date());
              }, i*2000); // Sleep for 1 second
              console.log('interval', interval, targetAddress,  Date());
          }

        // fs.createReadStream(filenName)
        //     .pipe(parse({ delimiter: "\r\n", from_line: 1 }))
        //     .on("data",  (targetAddressEnvelope:any) => {

        //         try {

        //             const targetAddress = targetAddressEnvelope[0];
        //             console.log('test targetAddress', targetAddress);
        //             const isValid = validator.validate(targetAddress);
        //             //console.log('test message', message);
        //             if(!dataCsvResult.includes(targetAddress) && isValid) {
        //                 console.log('test message isValid', targetAddress);
        //                 dataCsvResult.push(targetAddress);
                    
        //                 const transporter = this.emailService.getTransporter(emailInfo.sourceAddress, emailInfo.sourcePassword);
        //                 const message = this.emailService.getMessage(emailInfo, targetAddress, attachments);
        //                 const result = this.emailService.sendMessage(transporter, message);
        //             }

        //             return result;

        //         } catch(ex) {
        //             return ex;
        //         }
            
        //  })
        //  .on("end",  () => {
         
        //     setTimeout(()=>{
        //         console.log('dataResult on result', dataCsvResult);
        //     }, 2000);

        //  })
        //  .on("error", function (error) {
        //      console.log(error.message);
        //  });
         return dataCsvResult;
    
    }
}
