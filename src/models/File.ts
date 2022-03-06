import { Schema, model, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface FileData {
  name: string;
  url: string;
  subject: string;
  uid: string;
  path: string;
}

const FileSchema = new Schema<FileData>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    subject: { type: String, required: true },
    uid: { type: String, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

FileSchema.plugin(paginate);

interface FileDocument extends Document, FileData {}

export default model<FileDocument, PaginateModel<FileDocument>>('File', FileSchema);
