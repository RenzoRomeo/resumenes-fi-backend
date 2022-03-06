import { Schema, model } from 'mongoose';

interface File {
  name: string;
  url: string;
  subject: string;
  uid: string;
  path: string;
}

const FileSchema = new Schema<File>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    subject: { type: String, required: true },
    uid: { type: String, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('File', FileSchema);
