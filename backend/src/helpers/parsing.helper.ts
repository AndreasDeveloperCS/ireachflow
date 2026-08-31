
import { Injectable } from '@nestjs/common';
import { Email } from 'src/models/email.model';

@Injectable()
export class ParsingHelper {

    getExtension(fileName: string):string {
        
        const fileExtension = fileName.split('.').slice(-1)[0]
        console.log({fileExtension});
        return fileExtension;
    }

    getHostName(login: string):string {
        
        const hostName = login.split('@').slice(-1)[0]
        console.log({hostName});
        return hostName;
    }

    public getDate(date: Date):string {
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    }

    public covertJsonIntoEntity(emailResponse):Email {

        //console.log('convertedEntity', emailResponse);

        try {

            const convertedEntity = JSON.parse(JSON.stringify(emailResponse));
            convertedEntity.mainTargetAddress = convertedEntity.envelope.to[0];
            convertedEntity.mainSourceAddress = convertedEntity.envelope.from;
            return convertedEntity;

        } catch (ex) {

            console.error(ex);
            throw ex;

        }
      
    }
}
