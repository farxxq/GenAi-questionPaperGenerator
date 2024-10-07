import express from 'express';
import { generateQuestionPaper, getQuestionPapers } from '../controllers/questionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateQuestionPaper);
router.get('/', protect, getQuestionPapers);

export default router;
