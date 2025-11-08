import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.js';

const router = Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
    validate,
  ],
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
    validate,
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
  ],
  login
);

router.get('/me', auth, getMe);

export default router;
