import { Router } from 'express';

import File from '../models/File';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const files = await File.find({});
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
});

router.post('/new', async (req, res) => {
  try {
    const data = req.body;
    const file = new File(data);
    await file.save();
    res.status(200).json({ id: file.id });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
});

export default router;
