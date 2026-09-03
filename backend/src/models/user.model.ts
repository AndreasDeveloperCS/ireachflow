import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MARKETING_MANAGER = 'marketing_manager',
  CAMPAIGN_MANAGER = 'campaign_manager',
  ANALYST = 'analyst',
  VIEWER = 'viewer',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.VIEWER })
  role: UserRole;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true })
  organizationId: mongoose.Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface SafeUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId: string;
  isActive: boolean;
}

export function toSafeUser(user: UserDocument): SafeUser {
  return {
    id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    organizationId: user.organizationId.toString(),
    isActive: user.isActive,
  };
}
