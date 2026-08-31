
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export class EmailData {
    isProd:boolean;
    emailInfo:EmailInfo = new EmailInfo();
    targetAddressList?: {  file?: File; fileInfo?: any; fileName?: any; };
    attachments?:FileData [];
}

export class EmailInfo {
  isProd: boolean = false;
  subject:string = '';
    emailText:string = '';
    sourceAddress:string = '';
    sourcePassword:string = '';
}

export class FileData { 
    file?: File;
    fileInfo?: any; 
    fileName?: any;
};

export class DkimInfo {
    privateKey?:string;
    dkim:string;
}

@Schema()
@Entity('envelope')
export class Envelope extends Document {

    @Prop({ required: false })
    from: string
    
    @Prop({ required: false })
    to: string[]
  
}
const EnvelopeSchema = SchemaFactory.createForClass(Envelope);

export type EmailDocument = Email & Document;

@Schema()
@Entity("emails")
export class Email {

  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  @Prop({ required: true })
  messageId: string;

  @Column()
  @Prop({ required: true })
  response: string;

  @Column()
  @Prop({  type: EnvelopeSchema, required: true })
  envelope: Envelope;

  @Column()
  @Prop({ required: false })
  mainSourceAddress: string;

  @Column()
  @Prop({ required: false })
  mainTargetAddress: string;
  //@Prop({  type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Envelope' }], required: true })
  //envelope: Envelope;
  @Column()
  @Prop({ required: false })
  accepted: string []

  @Column()
  @Prop({ required: false })
  rejected: string []

  @Column()
  @IsOptional()
  @Prop({ required: false })
  ehlo: string []

  @Column()
  @Prop({ required: false })
  envelopeTime: number
  
  @Column()
  @Prop({ required: false })
  messageTime: number

  @Column()
  @Prop({ required: false })
  messageSize: number

  @Column()
  @Prop({ required: true, default: false })
  isOpened: boolean

  @Column()
  @Prop({ default: Date.now() })
  emailSentDate?: Date;

  @Column()
  @Prop({ required: false})
  isOpenedDate?: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
