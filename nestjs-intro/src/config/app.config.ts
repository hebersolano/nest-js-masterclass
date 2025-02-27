import { registerAs } from "@nestjs/config";

export default registerAs("app", () => {
  return {
    environment: process.env.NODE_ENV || "production",
    apiVertion: process.env.API_VERSION,
  };
});
