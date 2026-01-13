//HttpException 불러오기
import { HttpException } from './http.Exception.js';

//ConflictException 클래스 만들어서 내보내기, HttpException 클래스 상속받기
export class ConflictException extends HttpException {
  //생성자 함수: description을 매개변수로 받는 error객체 생성
  constructor(description = 'CONFLICT') {
    super(description, 409); //HttpException 클래스에 description = 'CONFLICT'와 statusCode = 409 전달
  }
}
