import { BadRequestException } from '../errors/badRequest.Exception.js';

// 입력 데이터 검증 미들웨어
export const dataValidator = (req, res, next) => {
  try {
    const { name, email } = req.body; // name, email 변수 선언, body 내용 할당

    //이름 검증 : 2글자 이상인가?
    if (!name || name.trim().length < 2) {
      throw new BadRequestException('이름은 2글자 이상이어야 합니다.');
    }

    //이메일 검증 : 이메일 형식에 맞는가?
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //이메일 정규표현식
    if (!email || !emailRegex.test(email)) {
      throw new BadRequestException('유효한 이메일 형식이어야 합니다.');
    }

    next(); //이상 없으면 다음 미들웨어 ㄱㄱ
  } catch (error) {
    next(error);
  }
};
