import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => {
  return {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    ttl: process.env.JWT_TTL,
    refreshTtl: process.env.JWT_TTL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
});
