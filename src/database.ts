import { connect } from 'mongoose';

const URI =
  'mongodb+srv://admin:admin@resumenes.jzr09.mongodb.net/resumenes?retryWrites=true&w=majority';

export const connectDB = async () => {
  try {
    await connect(URI);
    console.log('DB is connected');
  } catch (err) {
    console.error(err);
  }
};
