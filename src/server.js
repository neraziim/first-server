import express from 'express';
import { config, isDevelopment } from './config/config.js';
import { router } from './routes/index.js';
import { logger } from './middlewares/logger.middleware.js';
import { requestTimer } from './middlewares/requestTimer.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

//Middlewares
//개발 환경에서만 로깅 미들웨어 사용
if (isDevelopment()) {
  //logging
  app.use(logger);
  //timer
  app.use(requestTimer);
}

//JSON parsing
app.use(express.json());

//URL encoding parsing for req.body
app.use(express.urlencoded({ extended: true })); //query string

//static files : public 폴더 내 파일을 url로 그대로 제공
app.use(express.static('public'));

//모든 라우트 등록
app.use('/', router);

//error handler (제일 마지막)
app.use(errorHandler);

// 서버 시작(문은 제일 마지막에 연다)
app.listen(config.PORT, ()=> {
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log(`📦 Environment: ${config.NODE_ENV}`);
});
