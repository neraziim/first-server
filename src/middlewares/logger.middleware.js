//로깅 미들웨어
export const logger = (req, res, next) => {
  const timestamp = new Date().toISOString(); //timestamp 만들기
  console.log(`[${timestamp}] ${req.method} ${req.url}`); //timestamp와 request정보 출력
  next(); // 다음 미들웨어로 ㄱㄱ
};
