## Description

## Project setup

### .env sample

```env
NODE_ENV=development
API_VERSION=

AWS_REGION=
AWS_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_ACCESS_KEY_SECRET=
AWS_CLOUDFRONT_URL=

MAIL_HOST=
SMTP_USERNAME=
SMTP_PASSWORD=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_USER_PASSWORD=
DB_DATABASE_NAME=
ORM_SYNC=
ORM_AUTOLOAD=

JWT_SECRET=
JWT_AUDIENCE=
JWT_ISSUER=
JWT_TTL=
JWT_REFRESH_TTL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

PROFILE_API_KEY=none
```

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
