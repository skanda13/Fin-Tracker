import express from 'express';
import { 
  getGoals, 
  getGoalById, 
  createGoal, 
  updateGoal, 
  deleteGoal 
} from '../controllers/financialGoalController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes
router.route('/')
  .get(getGoals)
  .post(createGoal);

router.route('/:id')
  .get(getGoalById)
  .put(updateGoal)
  .delete(deleteGoal);

export default router; 