import { HttpException } from '../errors/http.Exception.js';

//인자 4개면 error 받는 미들웨어로 인식한다.
//(강사님 주석: next를 지우면 안됨! Express가 에러 미들웨어로 인식하려면 4개 인자 필수)
export const errorHandler = (error, req, res, _next) => {
  console.error('error message', error);
  //error 객체가 HttpException의 instance(class의 생성물)인가 판단
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    /** error 객체가 HttpException의 instance면 error response.
     * 이때 error message는 HttpException에서 전달받은 discription임.*/
  }
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
  // error 객체가 HttpException의 instance가 아니면 상태코드 500 response
};
