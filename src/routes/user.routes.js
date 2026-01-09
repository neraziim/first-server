import express from 'express';
// import { users } from '../dlrpehlfRkbb';
// import { nanoid } from 'nanoid'; //너무 험난한 여정이 될 것 같아서 주석처리함. 언젠가 할 수 있겠죠
import { dataValidator } from '../middlewares/dataValidator.middleware.js';

export const userRouter = express.Router();

//대충 초기값 설정(??)
let userList = [];
let userId = 1;

//GET users : 전체 유저 리스트
userRouter.get('/', (req, res) => {
  //성공 response
  res.json({
    success: true,
    users: userList, //userList를 보냄.
    count: userList.length, //표본 크기 파악
  });
});

//GET user by id
userRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id); //변수 id를 선언한다. request body의 parameter 중 id 값를 선언한 id에 할당하려는데 호오옥시나 string이 들어오면 integer로 바꾸겠다.
  const user = userList.find((user) => user.id === id); //변수 user를 선언한다. userList의 property 중 id의 value가 지역변수 id와 일치하는 property를 user에 할당하겠다.

  //실패 response : 존재하지 않는 유저
  if (!user) {
    //return으로 작업 종결
    return (
      res
        //not found 코드
        .status(404)
        .json({
          success: false,
          message: '해당 유저를 찾을 수 없습니다!',
        })
    );
  }

  //성공 response
  res.json({
    success: true,
    data: user, //지역변수 user를 response에 실어보낸다.
  });
});

//POST new user
userRouter.post('/', dataValidator, (req, res) => {
  //request body의 name과 email property를 변수 name, email에 할당
  const { name, email } = req.body;

  //실패 response : 미입력 검증
  //name '또는' email 누락인 경우
  if (!name || !email) {
    return (
      res
        //못된 요청!🍎 코드
        .status(400)
        .json({
          success: false,
          message: '이름과 이메일은 필수로 입력해야 합니다.',
        })
    );
  }

  //신규 등록 값 선언, 할당
  const newUser = {
    id: userId,
    name,
    email,
  };

  userList = [...userList, newUser]; //유저 목록에 신규 등록자 추가

  //성공 response
  res
    .status(201) //생성 성공 코드
    .json({
      success: true,
      data: newUser,
      message: '신규 유저가 등록되었습니다.',
    });
  userId++; //userId값 중복되지 않도록 1 증가
});

//PUT user(update)
userRouter.put('/:id', dataValidator, (req, res) => {
  const id = parseInt(req.params.id); //request의 id값을(아무튼 인티저로 바꿔버리고) 선언된 변수 id에 할당
  //request body의 name과 email property를 변수 name, email에 할당
  const { name, email } = req.body;
  //변수 userIndex 선언, userList의 property 중 id의 value가 지역변수 id와 일치하는 property의 index를 userIndex에 할당
  const userIndex = userList.findIndex((user) => user.id === id);

  // 실패 response: 존재하지 않는 유저
  //userIndex는 index(int)반환, false일때 -1
  if (userIndex === -1) {
    //return으로 작업 종결
    return (
      res
        //not found 코드
        .status(404)
        .json({
          success: false,
          message: '해당 유저를 찾을 수 없습니다!',
        })
    );
  }

  // 정보 수정 : userIndex로 찾은 userList의 요소(객체)에 새로운 값 넣기.
  userList[userIndex] = { ...userList[userIndex], name, email }; //스프레드 연산자로 요소를 복사하고 name, email을 덮어쓴 것을 할당

  // 성공 response
  res.json({
    success: true,
    data: userList[userIndex],
    message: `사용자 ${req.params.id} 업데이트`,
  });
});

//DELETE user
userRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id); //request의 id값을(아무튼 인티저로 바꿔버리고) 선언된 변수 id에 할당

  //변수 userIndex 선언, userList의 property 중 id의 value가 지역변수 id와 일치하는 property의 index를 userIndex에 할당
  const userIndex = userList.findIndex((user) => user.id === id);

  // 실패 response: 존재하지 않는 유저
  //userIndex는 index(int)반환, false일때 -1
  if (userIndex === -1) {
    //return으로 작업 종결
    return res.status(404).json({
      //not found 코드
      success: false,
      message: '해당 유저를 찾을 수 없습니다!',
    });
  }

  //유저 삭제
  userList.splice(userIndex, 1);

  //response
  res.json({ success: true, message: `사용자 ${id} 삭제` });
});

//GET 유저 게시글
userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
