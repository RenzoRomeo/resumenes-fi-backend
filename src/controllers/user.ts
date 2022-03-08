import { Router } from 'express';

import File from '../models/File';
import User from '../models/User';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const users = await User.paginate({}, { limit, page });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
});

router.post('/new', async (req, res) => {
  const data = req.body;
  try {
    const user = new User(data);
    await user.save();
    res.status(200).json({ message: 'User saved' });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.post('/:id/update', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(id, data);
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.post('/:id/addfile', async (req, res) => {
  const { id } = req.params;
  const { fileId } = req.body;
  try {
    await User.findByIdAndUpdate(id, {
      $push: { files: fileId },
    });
    res.status(200).json({ message: 'File added' });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.post('/:id/deletefile', async (req, res) => {
  const { id } = req.params;
  const { fileId } = req.body;
  try {
    const deleted = await User.findByIdAndUpdate(id, {
      $pull: { files: fileId },
    });
    res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
});

router.get('/:id/files', async (req, res) => {
  const { id } = req.params;
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const user = await User.findById(id);
    const fileIds = user.files;
    const files = await File.paginate(
      { _id: { $in: fileIds } },
      { limit, page }
    );
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default router;
