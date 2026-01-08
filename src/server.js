import express from 'express';

const app = express();
const PORT = 5001;

//JSON parsing middleware
app.use(express.json());



// 서버 시작(문은 제일 마지막에 연다)
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
