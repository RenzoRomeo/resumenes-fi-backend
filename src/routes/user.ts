import { Router } from 'express';

import User from '../models/User';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
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

router.put('/update/:id', async (req, res) => {
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

router.put('/addfile/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(id, {
      $push: { files: data },
    });
    res.status(200).json({ message: 'File added' });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default router;
