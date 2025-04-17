import express from 'express';
import { 
  getInvestments, 
  getInvestmentById, 
  createInvestment, 
  updateInvestment, 
  deleteInvestment 
} from '../controllers/investmentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes
router.route('/')
  .get(getInvestments)
  .post(createInvestment);

router.route('/:id')
  .get(getInvestmentById)
  .put(updateInvestment)
  .delete(deleteInvestment);

export default router; 