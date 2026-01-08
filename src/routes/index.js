import express from 'express';
import { userRouter } from './user.routes';
import { searchRouter } from './search.routes';

export const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello Express!',
    timestamp: new Date().toISOString(),
  });
});

router.use('/users', userRouter);
router.use('/search', searchRouter);
