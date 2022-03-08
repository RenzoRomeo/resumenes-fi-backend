import express from 'express';
import cors from 'cors';

import { connectDB } from './database';
import decodeToken from './middleware/auth';
import userRouter from './controllers/user';
import fileRouter from './controllers/file';

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(decodeToken)
app.use(express.json());
app.use('/users', userRouter);
app.use('/files', fileRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server listening on port ${port}`);
});
