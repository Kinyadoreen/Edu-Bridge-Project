import { Router } from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getDashboard,
} from '../controllers/courseController.js';
import { auth } from '../middleware/auth.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.js';

const router = Router();

router.get('/', getCourses);
router.get('/:id', getCourse);

router.post(
  '/',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    validate,
  ],
  createCourse
);

router.put('/:id', auth, updateCourse);
router.delete('/:id', auth, deleteCourse);
router.post('/:id/enroll', auth, enrollCourse);

export default router;
