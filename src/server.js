import express from 'express';
import { router } from './routes/index.js';
import { logger } from './middlewares/logger.middleware.js';
import { requestTimer } from './middlewares/requestTimer.middleware.js';

const app = express();
const PORT = 5001;

//Middlewares
//JSON parsing
app.use(express.json());

//URL encoding parsing for req.body
app.use(express.urlencoded({ extendeed: true })); //query string

//static files : public 폴더 내 파일을 url로 그대로 제공
app.use(express.static('public'));

//logging
app.use(logger);

//timer
app.use(requestTimer);


//모든 라우트 등록
app.use('/', router);

// 서버 시작(문은 제일 마지막에 연다)
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
