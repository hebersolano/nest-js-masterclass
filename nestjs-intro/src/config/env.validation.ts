import * as Joi from "joi";

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "test", "production", "staging")
    .default("development"),
  DB_PORT: Joi.number().port().default(5432),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_USER_PASSWORD: Joi.string().required(),
  DB_DATABASE_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_AUDIENCE: Joi.string().required(),
  JWT_ISSUER: Joi.string().required(),
  JWT_TTL: Joi.string().required(),
  JWT_REFRESH_TTL: Joi.string().required(),
});
