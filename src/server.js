import express from 'express';
import { nanoid } from 'nanoid';

const app = express();
const PORT = 5001;

let users = [];

//JSON parsing middleware
app.use(express.json());

//HTTP routes test
app.get('/users', (req, res) => {
  res.json({ users: users });
});

app.get('/users/:id', (req, res) => {
  res.json({ users: users });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: nanoid(), 
    name,
    email 
  };
  users = [...users, newUser];
  res.status(201).json({ message: '사용자 생성됨', name, email });
});

app.put('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});

app.delete('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});

// 서버 시작(문은 제일 마지막에 연다)
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
