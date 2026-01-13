//HttpException 클래스 만들어서 내보내기, Error 클래스 상속받기
export class HttpException extends Error {
  statusCode; //상태코드 프로퍼티 추가
  //생성자 함수: description, statusCode를 매개변수로 하는 error객체 생성
  constructor(description, statusCode) {
    super(description); //Error.message에 description 전달
    this.name = this.constructor.name; //생성할 error객체의 name(기본값 Error.name 상속, Error)에 HttpException.name(HttpException) 할당
    this.statusCode = statusCode; //생성할 error객체의 상태코드 프로퍼티(HttpException.statusCode)에 매개변수로 받은 statusCode 할당
  }
}
