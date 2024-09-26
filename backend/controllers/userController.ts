import { Request, Response } from 'express';

import { validationResult } from 'express-validator';

import UserService from '../services/user/userService';

import User from '../models/User';

interface AuthenticatedRequest extends Request {
  payload?: { id: string };
}

class UserController {
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserService.authenticateUser(email, password);

      res.status(200).json(user);
    } catch (error: any) {
      console.error('Could not login', error);

      if (error.message === 'User was not found' || error.message === 'Password is incorrect') {
        return res.status(400).json({ message: error.message });
      }

      res.status(500).json('Something went wrong');
    }
  };

  async registerUser(req: Request, res: Response) {
    try {
      const { name, lastName, email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with such email already exists' });
      }

      if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
      }

      const newUser = await UserService.createUser(name, lastName, email, password);

      return res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      console.error('Could not register user:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.fetchAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Could not get users', error);
      res.status(500).json('Something went wrong');
    }
  };

  async getMyUser(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.payload?.id;

      const user = await UserService.fetchUserById(userId);

      if (!user) {
        return res.status(404).json('User was not found');
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error('Could not get user', error);
      res.status(500).json('Something went wrong');
    }
  };

  async updateMyUser(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.payload?.id;

      const updatedUser = await UserService.updateUserById(userId, req.body);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Could not update user', error);
      res.status(500).json('Something went wrong');
    }
  };

  async logoutUser(req: Request, res: Response) {
    try {
      res.status(200).json('Successfully logged out');
    } catch (error) {
      console.error('Could not sign out', error);
      res.status(500).json('Something went wrong');
    }
  };

  async adminAccess(req: Request, res: Response) {
    res.status(200).json('Welcome Admin');
  };
}

export default new UserController();
