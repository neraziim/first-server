import mongoose from 'mongoose';

//user schema 클래스 만들기
const userSchema = new mongoose.Schema(
  //필드 정의: type, required, unique
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  },
  //mongoose 설정
  {
    timestamps: true, //createdAt, updatedAt 자동 기록해줌
    toJSON: { virtuals: true }, //json 변환할 때 가상 필드 허용
    toObject: { virtuals: true }, //object 변환할 때 가상 필드 허용
    versionKey: false, // __v 필드를 제거
  }
);

//User로 user schema 모델링한 결과를 내보냄
export const User = mongoose.model('User', userSchema);