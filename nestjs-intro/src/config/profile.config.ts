import { registerAs } from '@nestjs/config';

export default registerAs('profile', () => {
  return {
    apiKey: process.env.PROFILE_API_KEY,
  };
});
