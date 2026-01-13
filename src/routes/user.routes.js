import express from 'express';
// import { users } from '../dlrpehlfRkbb';
// import { nanoid } from 'nanoid'; //너무 험난한 여정이 될 것 같아서 주석처리함. 언젠가 할 수 있겠죠
import { dataValidator } from '../middlewares/dataValidator.middleware.js';
import { NotFoundException } from '../errors/notFound.Exception.js';
import { User } from '../models/user.model.js';
import { ConflictException } from '../errors/Conflict.Exception.js';

export const userRouter = express.Router();

//GET users : 전체 유저 리스트
userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users, count: users.length });
  } catch (error) {
    next(error);
  }
});

//GET user by id
userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ success: true, data: user });
    //실패 404 error response
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
  } catch (error) {
    next(error);
  }
});

//POST new user
userRouter.post('/', dataValidator, async (req, res, next) => {
  try {
    //request body의 name과 email property를 변수 name, email에 할당
    const { name, email } = req.body;

    //실패 409 error response: 이메일 중복
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    //신규 등록 값 선언, 할당
    const newUser = new User({ name, email });
    await newUser.save();
    //201 생성 성공 response
    res.status(201).json({
      success: true,
      data: newUser,
      message: '신규 사용자가 생성되었습니다.',
    });
  } catch (error) {
    next(error);
  }
});

//PATCH user(update)
userRouter.patch('/:id', dataValidator, async (req, res, next) => {
  try {
    //request body의 name과 email property를 변수 name, email에 할당
    const { name, email } = req.body;
    //request 파라미터의 id를 userId에 할당
    const { id: userId } = req.params;

    // 실패 409 error response: 이메일 중복 (본인 제외)
    //변수 existingUser를 선언한다. User에서 email이 동일하고 userId는 not equal인 경우를 찾는다.
    const existingUser = await User.findOne({ email, _id: { $ne: userId } }); //ne(not equal)
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 정보 수정 : findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true },
    );
    // 404 error response
    if (!updatedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    // 성공 response
    res.json({
      success: true,
      data: updatedUser,
      message: `사용자 ${req.params.id} 정보가 수정되었습니다.`,
    });
  } catch (error) {
    next(error);
  }
});

//DELETE user
userRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    // 실패 404 error response
    if (!deletedUser) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다!');
    }

    //성공 response
    res.json({
      success: true,
      data: deletedUser,
      message: `사용자 ${req.params.id}가 삭제되었습니다.`,
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
