import { Schema, model, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface UserData {
  email: string;
  name: string;
  lastName: string;
  _id: string;
  lastSeen?: Date;
  files?: string[];
}

const UserSchema = new Schema<UserData>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    _id: { type: String, required: true },
    lastSeen: Date,
    files: [String],
  },
  { timestamps: true }
);

UserSchema.plugin(paginate);

interface UserDocument extends Document, UserData {}

export default model<UserDocument, PaginateModel<UserDocument>>('User', UserSchema);
