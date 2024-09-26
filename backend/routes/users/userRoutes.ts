import express from 'express';

import authMiddleware from '../../middlewares/authMiddleware';
import roleMiddleware from '../../middlewares/roleMiddleware';

import UserController from '../../controllers/userController';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);
router.get('/my-user', authMiddleware, UserController.getMyUser);
router.patch('/my-user', authMiddleware, UserController.updateMyUser);
router.delete('/logout', authMiddleware, UserController.logoutUser);
router.get('/admin', roleMiddleware('admin'), UserController.adminAccess);

export default router;
