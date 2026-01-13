import express from 'express';
// import { users } from '../dlrpehlfRkbb';
// import { nanoid } from 'nanoid'; //너무 험난한 여정이 될 것 같아서 주석처리함. 언젠가 할 수 있겠죠
import { dataValidator } from '../middlewares/dataValidator.middleware.js';
import { NotFoundException } from '../errors/notFound.Exception.js';
import { ConflictException } from '../errors/Conflict.Exception.js';

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
userRouter.get('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id); //변수 id를 선언한다. request body의 parameter 중 id 값를 선언한 id에 할당하려는데 호오옥시나 string이 들어오면 integer로 바꾸겠다.
    const user = userList.find((user) => user.id === id); //변수 user를 선언한다. userList의 property 중 id의 value가 지역변수 id와 일치하는 property를 user에 할당하겠다.

    //실패 404 error response: user === undefined 인 경우
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.'); //description 전달. 상태코드는 instance에 이미 포함됨.
    }

    //성공: user !== undefined 인 경우 user data response
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

//POST new user
userRouter.post('/', dataValidator, (req, res, next) => {
  try {
    //request body의 name과 email property를 변수 name, email에 할당
    const { name, email } = req.body;
   
    //실패 409 error response: 이메일 중복
    const existingUser = userList.find((user) => user.email === email); //변수 existingUser를 선언한다. userList의 property 중 email의 value가 지역변수 email과 일치하는 property를 existingUser에 할당하겠다.
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    //신규 등록 값 선언, 할당
    const newUser = {
      id: userId,
      name,
      email,
      createdAt: new Date().toISOString(),
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
  } catch (error) {
    next(error);
  }
});

//PATCH user(update)
userRouter.patch('/:id', dataValidator, (req, res, next) => {
  try {
    const id = parseInt(req.params.id); //request의 id값을(아무튼 인티저로 바꿔버리고) 선언된 변수 id에 할당
    //request body의 name과 email property를 변수 name, email에 할당
    const { name, email } = req.body;
    //변수 userIndex 선언, userList의 property 중 id의 value가 지역변수 id와 일치하는 property의 index를 userIndex에 할당
    const userIndex = userList.findIndex((user) => user.id === id);

    //실패 404 error response: userIndex는 index(int)반환, false일때 -1.
    if (userIndex === -1) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다!');
    }

    // 실패 409 error response: 이메일 중복 (본인 제외)

    const existingUser = userList.find(
      (user) => user.email === email && user.id !== id,
    ); //변수 existingUser를 선언한다. userList의 property 중 email의 value가 지역변수 email과 일치하고, user id는 일치하지 않는 property를 existingUser에 할당하겠다.
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 정보 수정 : userIndex로 찾은 userList의 요소(객체)에 새로운 값 넣기.
    if (name) userList[userIndex].name = name;
    if (email) userList[userIndex].email = email;
    userList[userIndex].updatedAt = new Date().toISOString();

    // 성공 response
    res.json({
      success: true,
      data: userList[userIndex],
      message: `사용자 ${req.params.id} 정보가 수정되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
});

//DELETE user
userRouter.delete('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id); //request의 id값을(아무튼 인티저로 바꿔버리고) 선언된 변수 id에 할당
    //변수 userIndex 선언, userList의 property 중 id의 value가 지역변수 id와 일치하는 property의 index를 userIndex에 할당
    const userIndex = userList.findIndex((user) => user.id === id);

    // 실패 404 error response: userIndex는 index(int)반환, false일때 -1
    if (userIndex === -1) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다!');
    }

    const deletedUser = userList[userIndex]; // 삭제할 정보
    userList.splice(userIndex, 1); // 유저 삭제

    //성공 response
    res.json({
      success: true,
      data: deletedUser,
      message: `사용자 ${id}가 삭제되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
});

//GET 유저 게시글
userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
