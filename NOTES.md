[NestJs Masterclass](https://www.udemy.com/share/10bAMJ3@BEy_KYScW6iUILWZIeAvhJXyXv-ful6qjEDX93R4QsWvQusLltG7PVCUkcw5PxlJkQ==/)

# Links

- [Nest CLI]()
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [nestjs mapped-types](https://github.com/nestjs/mapped-types)

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
