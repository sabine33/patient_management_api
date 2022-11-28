Patient Profile Management API

Patient profile management API is an api that provides a way for an admin to add/update/delete/view patients.

API Documentation:
Swagger document is provided with all the api endpoints.

Tech stack:
Typescript
TTypescript
Jest as a test runner
Zod as a validator
typeDI for dependency injection

Demo URL:

API Endpoints:
POST /auth/login : Login
POST /auth/signup : Signup
POST /auth/token : Regenerate token from refresh token
GET /patients: Fetch all patients
GET /patients/:id : Fetch patient from ID
POST /patients : Create a new patient
PUT /patients/:id : Updates patient
DELETE /patients/:id : Deletes a patient
POST /uploads/image : Image upload route
GET /uploads/:filename : Public URL to receive image files.
GET / health check route

## XO Sports Backend Project

- The project structure is inspired from bulletproof-nodejs with some tweaks.
- Xo Sports backend project

# Tools Used

- Docker
- NodeJS
- Typescript
- Prisma
- TSC Alias for aliasing issues

## How to setup this project

- Run `./docker.sh`

## Deploy

- docker build -t xosports .
- docker run -p 3000:3000 -d xosports

## Folder structure

| Folder       | Purpose                                                       |
| ------------ | ------------------------------------------------------------- |
| api/         | Application entry                                             |
| config       | Configuration Files                                           |
| controllers  | API Controllers                                               |
| decorators   | Decorators                                                    |
| helpers      | Reusable helper functions                                     |
| interfaces   | Interface used for other parts                                |
| jobs         | List of jobs                                                  |
| loaders      | Loading necessary modules into the projects eg:express,prisma |
| middlewares  | Express middlewares                                           |
| models       | Prisma models                                                 |
| repositories | DB specific modules                                           |
| routes       | Route specific modules                                        |
| services     | Handles major operations                                      |
| subscribers  | Event dispatch and handling                                   |
| types        | Typescript types                                              |
| validators   | Validate requests and other data                              |

## Packages Used and their purpose

| Module                 | Purpose                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| require-all            | Requiring all modules -used for event                                                        |
| agenda                 | Job scheduling                                                                               |
| agendash               | Dashboard for agenda                                                                         |
| argon2                 | For hashing                                                                                  |
| body-parser            | Parsing body for http-request                                                                |
| celebrate              | Wrapping joi validation in express                                                           |
| cors                   | Managing cross origin requests                                                               |
| dotenv                 | Dotenv file parsing                                                                          |
| errorhandler           | Development-only error handler middleware                                                    |
| event-dispatch         | Allows to register subscribers and dispatch events across the application                    |
| event-emitter          | Event emitter                                                                                |
| express                | Express is Express 🙂                                                                        |
| express-async-errors   | remember the pain in async error handling                                                    |
| express-basic-auth     | Basic auth for agentdash                                                                     |
| express-jwt            | JWT handling for express                                                                     |
| express-route-grouping | Grouping related routes just like in adonis                                                  |
| form-data              | For Mailgun                                                                                  |
| joi                    | Validation library                                                                           |
| jsonwebtoken           | Generating and verifying json web tokens                                                     |
| lodash                 | Needs no intro.                                                                              |
| mailgun.js             | Mailgun Client                                                                               |
| method-override        | Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it. |
| moment                 | Time handling                                                                                |
| moment-timezone        | Parse and display moments in any timezone                                                    |
| morgan                 | File uploads                                                                                 |
| pm2                    | Process Management                                                                           |
| reflect-metadata       | Reflection library                                                                           |
| typedi                 | Dependency Injection                                                                         |
| winston                | A powerful logger                                                                            |

## Devops

- Caprover
- Docker
- NodeJS
- Postgres
- Prisma

## Task

- Link with postgreSQL
- Error handling
- Setup ORM (Prisma Preferred)
- Implement authentication: Register/Login/Signup

\*https://stackoverflow.com/questions/59179787/tsc-doesnt-compile-alias-paths

## Why eTSC ?

- Extremely Fast build (No slow tsc -> uses esbuild)
- TSConfig path supports nope 😢 , tspaths here to help
- Now normal node could do the
