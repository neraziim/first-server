import express from 'express';

export const searchRouter = express.Router();

//GET search
searchRouter.get('/', (req, res) => {
  const { q, limit = 10 } = req.query;
  res.json({ query: q, limit: Number(limit) });
});

