import express from 'express';
// import { users } from '../dlrpehlfRkbb';
// import { nanoid } from 'nanoid'; //너무 험난한 여정이 될 것 같아서 주석처리함. 언젠가 할 수 있겠죠

export const userRouter = express.Router();

let userlist = [];

//GET users
userRouter.get('/users', (req, res) => {
  res.json({ users: [] });
});

//GET user by id
userRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

//POST new user
userRouter.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    name,
    email,
  };
  userlist = [...userlist, newUser];
  res.status(201).json({ message: '사용자 생성됨', newUser });
});

//PUT user(update)
userRouter.put('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});

//DELETE user
userRouter.delete('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});

//GET 유저 게시글
userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

