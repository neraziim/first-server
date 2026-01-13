import { z } from 'zod';

//이 서버가 어떤 환경에서 돌아가고 있을까요? 포트번호는 1000~65535 사이인가요?
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().min(1000).max(65535),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
    }); //envSchema의 요소를 parsing하여 객체로 반환.
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('error.errors', error); //실패하면error 반환
    }
    process.exit(1); //강종
  }
};

// 환경파일의 요소 객체를 config로 내보내기.
export const config = parseEnvironment();

// 환경별 헬퍼 함수들
export const isDevelopment = () => config.NODE_ENV === 'development';//NODE_ENV가 development인지 확인
export const isProduction = () => config.NODE_ENV === 'production';//NODE_ENV가 production인지 확인
export const isTest = () => config.NODE_ENV === 'test';//NODE_ENV가 test인지 확인

