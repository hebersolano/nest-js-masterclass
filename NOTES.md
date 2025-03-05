[NestJs Masterclass](https://www.udemy.com/share/10bAMJ3@BEy_KYScW6iUILWZIeAvhJXyXv-ful6qjEDX93R4QsWvQusLltG7PVCUkcw5PxlJkQ==/)

# Links

- [Nest CLI]()
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [nestjs mapped-types](https://github.com/nestjs/mapped-types)
- [nestjs swagger](https://docs.nestjs.com/openapi/introduction)
- [nestjs config module](https://docs.nestjs.com/techniques/configuration): `npm i --save @nestjs/config`
- [TypeORM](https://typeorm.io/)
  - [TypeORM package](https://github.com/typeorm/typeorm)
  - [@nestjs/typeorm](https://github.com/nestjs/typeorm#readme)
  - PostgreSQL driver `npm install pg --save`
  - [PostgresSQL Docs](https://www.postgresql.org/docs/17/index.html)
- [google auth library](https://github.com/googleapis/google-auth-library-nodejs)

# NestJS Docs

- [Validation](https://docs.nestjs.com/techniques/validation): Pipes, etc

# Code

- `@Param('optional', new OptionalPipe(ParseIntPipe)) optional?: number,` optional parameter

Request Response Lifecycle
Request > Middleware >
*filter start >
Guards > Interceptors > Pipes > Controller > Interceptors >
*filters end >
Response

## Pipes

- Validation
- Transformation

## Exceptions

- [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)

# Authorization

- Hashing
- JWT
- Guards
- Metadata / Reflector

## Interceptors

Execute before controller and after response is generated

## File uploading

Website > cloud Front (CDN) > S3 Storage

## Mail notification

## Testing

- Jest testing
