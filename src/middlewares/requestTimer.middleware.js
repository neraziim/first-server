//타이머 미들웨어
export const requestTimer = (req, res, next) => {
  //작업 시작시각
  req.startTime = Date.now();

  //응답 끝날 때
  res.on('finish', () => {
    const duration = Date.now() - req.startTime; //(작업시간) = (작업 완료시각)-(작업 시작시각)
    console.log(`요청 처리 시간: ${duration}ms`); //출력
  });
  next(); //다음 미들웨어로 ㄱㄱ
};
