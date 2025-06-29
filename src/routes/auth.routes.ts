import express from 'express';
import { signup, login, getMe } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { signupSchema, loginSchema } from '../schemas/auth.schema';
import { protect } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { getAllUsers } from '../controllers/admin.controller';

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);
router.get('/admin/users', protect, authorize(['admin']), getAllUsers);

export default router;
