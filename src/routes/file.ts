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
  const data = req.body;
  try {
    const file = new File(data);
    await file.save();
    res.status(200).json({ id: file.id });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await File.findByIdAndDelete(id);
    res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
});

export default router;
