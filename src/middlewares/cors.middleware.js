//교차 출처 리소스 공유
export const cors = (req, res, next) => {
  const origin = req.headers.origin || req.headers.host || ''; // 요청 주소 확인
  const isDev = process.env.NODE_ENV !== 'production'; // 개발 환경 확인
  const whitelist = [];
  const isAllowed = isDev || whitelist.includes(origin);
  // 개발모드 or whitelist에 포함되어있으면 허용
  if (isAllowed) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  //허용되는 메소드
  res.header('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');
  //허용되는 헤더
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  /** 서버도 헤더에 적절한 설정을 하지 않으면 브라우저에서 응답을 거부함.
- 응답 헤더의 Access-Control-Allow-Credentials 항목을 true로 설정해야 한다.
- 응답 헤더의 Access-Control-Allow-Origin 의 값에 와일드카드 문자("*")는 사용할 수 없다.
- 응답 헤더의 Access-Control-Allow-Methods 의 값에 와일드카드 문자("*")는 사용할 수 없다.
- 응답 헤더의 Access-Control-Allow-Headers 의 값에 와일드카드 문자("*")는 사용할 수 없다. */

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next(); //다음 미들웨어로 ㄱㄱ
};
