import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface UserModel {
  _id?: string;
  email: string;
  firstName: string;
  passwordHash: string;
}
export type UserDocument = UserModel & Document;

@Schema()
export class User implements UserModel {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  passwordHash: string;
}

export const UserScheme = SchemaFactory.createForClass(User);
