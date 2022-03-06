import { Schema, model } from 'mongoose';

interface User {
  email: string;
  name: string;
  lastName: string;
  _id: string;
  lastSeen?: Date;
  files?: string[];
}

const UserSchema = new Schema<User>(
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

export default model('User', UserSchema);
