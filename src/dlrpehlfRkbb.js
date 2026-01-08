const users = [
  { id: 1, name: '김하늘', email: 'kim@example.com' },
  { id: 2, name: '이준호', email: 'lee@example.com' },
  { id: 3, name: '박서연', email: 'jin@example.com' },
  { id: 4, name: '최민준', email: 'boh@example.com' },
  { id: 5, name: '정다은', email: 'baek@example.com' },
  { id: 6, name: '한지우', email: 'han@example.com' },
  { id: 7, name: '오세훈', email: '5ohe@example.com' },
  { id: 8, name: '윤수빈', email: 'yun@example.com' },
  { id: 9, name: '강민지', email: 'minji@example.com' },
  { id: 10, name: '신현우', email: 'shin@example.com' },
  { id: 11, name: '서지훈', email: 'seo@example.com' },
  { id: 12, name: '홍예린', email: 'hong@example.com' },
  { id: 13, name: '조태현', email: 'joe@example.com' },
  { id: 14, name: '임나연', email: 'rim@example.com' },
  { id: 15, name: '배도윤', email: 'youn@example.com' }
];

// nextId는 ++로 증가시키기 때문에 const가 아니라 let이어야 합니다.
let nextId = 16;

//user list 조회
export const searchUsers = () => {
  return users;
};

//user 조회 by id
export const searchUserById = (id) => {
  return users.id({id});
};

// user 추가
export const addUser = ({name, email}) => {
  const newUser = {
    id: nextId,
    name,
    email
  }
  users.push(newUser);
  nextId ++;
  return newUser;
};

// user 삭제
export const deleteUser = (id) => {
  const thisIsTheUser = users.;
};
