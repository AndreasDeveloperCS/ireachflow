import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from 'src/models/email.model';
import { Service } from "typedi";

@Injectable()
@Service()
export class EmailLoggingService {
   
    constructor(
        @InjectModel(Email.name)
        private readonly emailModel: Model<EmailDocument>
    ) {

    }

    public saveEmailResponseLog(email: Email): Promise<Email> {

        //console.log('saveEmailResponseLog', email);
        
        const entity: Email = email;

        const emailLogCreated = new this.emailModel(entity);

        const result = emailLogCreated.save();

        //console.log('saveEmailResponseLog', result);
        
        return result;

    }

    async messageIsOpened(messageId: string) {
         //console.log('saveEmailResponseLog', email);
        
        //  const entity: Email = email;

         const updatingMessageQuery =  this.emailModel.findOneAndUpdate({messageId : messageId}, {isOpened:true, isOpenedDate: Date.now() });
 
         const result = updatingMessageQuery.setOptions({
            useFindAndModify: true,
            strict: false
          });
         const updatingMessageEntity = await updatingMessageQuery;
         updatingMessageEntity.save();
         
         return updatingMessageEntity;
    }

    
}
