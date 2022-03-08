import admin from '../config/firebase-config';

const decodeToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded) {
      return next();
    }
    res.json({ message: 'Unauthorized' });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default decodeToken;
