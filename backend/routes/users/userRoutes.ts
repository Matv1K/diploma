import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authMiddleware from '../../middlewares/authMiddleware';
import roleMiddleware from '../../middlewares/roleMiddleware';

import User from '../../models/User';

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

// TODO: DO NOT SEND PASSWORDS BACK TO THE CLIENT

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password } = req.body;

    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      lastName,
      role: 'user',
    });

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id, email: savedUser.email, role: savedUser.role },
      `${process.env.SECRET_KEY}`,
      { expiresIn: '30d' });

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    console.error('Could not register', error);
    res.status(500).json('Something went wrong');
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, `${process.env.SECRET_KEY}`,
      { expiresIn: '30d' });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Could not login', error);
    res.status(500).json('Something went wrong');
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error('Could not get users', error);
    res.status(500).json('Something went wrong');
  }
});

router.get('/my-user', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).payload?.id;

    if (!userId) {
      return res.status(404).json('User ID not found in token');
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json('User not found');
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Could not get user', error);
    res.status(500).json('Something went wrong');
  }
});

router.patch('/my-user', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { phoneNumber, name, lastName, email, address } = req.body;
    const userId = (req as AuthenticatedRequest).payload?.id;

    const updatedUser = await User.findByIdAndUpdate(userId,
      { phoneNumber, name, lastName, email, address },
      { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Could not update user', error);
    res.status(500).json('Something went wrong');
  }
});

router.delete('/logout', authMiddleware, async (req: Request, res: Response) => {
  try {
    res.status(200).json('Successfully logged out');
  } catch (error) {
    console.error('Could not sign out', error);
    res.status(500).json('Something went wrong');
  }
});

router.get('/admin', roleMiddleware('admin'), async (req: Request, res: Response) => {
  res.status(200).json('Welcome Admin');
});

export default router;
