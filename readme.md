# Patient Profile Management API

Patient profile management API is an api that provides a way for an admin to add/update/delete/view patients.

## Installation

- Clone the repo.
- Update environment variables.
- Switch to node version 18 & run following commands.

```bash
nvm use 18
yarn
npx prisma db push
yarn dev
```

or via docker,

```sh
docker build -t ppmapi .
docker run -p 4000:4000 -d ppmapi
```

## Deployment

- Clone the repo.
- Generate docker image & run docker container based on Dockerfile.
- Database for local setup? use docker-compose.

* As it's taking more time to build on server , I am pushing a prebuilt image to server.
* Git push on staging branch will deploy it to render.

## Database

- Database first approach was used, but you can do : npx prisma db push or run seed.sql file on database server.

## Swagger Docs

Swagger document is provided with all the api endpoints.

[DOCS](https://ppm-api.onrender.com/docs)

![API Docs](screenshot.png?raw=true "API docs Screenshot")

## Frontend Demo

[DEMO](https://ppm-4440.onrender.com)

## Tech Stack

NodeJS 18
Swagger : API Documentation
Prisma : ORM
Typescript
Express
Jest
Zod for api validation
Docker
Docker container, frontend & database deployed to Render.

## API Endpoints

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

## Tools Used

- Docker for deployment (To Render, Github CICD)
- NodeJS
- Typescript
- Prisma (ORM)
- Postgres (Database)

## Folder structure

| Folder      | Purpose                                                       |
| ----------- | ------------------------------------------------------------- |
| src/        | Source code entrypoint                                        |
| config      | Configuration File                                            |
| controllers | API Controllers                                               |
| decorators  | Decorators                                                    |
| helpers     | Reusable helper functions                                     |
| interfaces  | Interface used for other parts                                |
| loaders     | Loading necessary modules into the projects eg:express,prisma |
| middlewares | Express middlewares                                           |
| models      | Some Prisma models                                            |
| routes      | Route specific modules                                        |
| services    | Handles major operations                                      |
| subscribers | Event dispatch and handling                                   |
| types       | Typescript types                                              |
| validators  | Validate requests and other data                              |
| emails      | Templates for email notification                              |
| events      | Events                                                        |

## Packages used and their purpose

| Module               | Purpose                                                                   |
| -------------------- | ------------------------------------------------------------------------- |
| argon2               | For hashing                                                               |
| body-parser          | Parsing body for http-request                                             |
| cors                 | Managing cross origin requests                                            |
| dotenv               | Dotenv file parsing                                                       |
| event-dispatch       | Allows to register subscribers and dispatch events across the application |
| express              | Express is Express 🙂                                                     |
| express-async-errors | remember the pain in async error handling                                 |
| jsonwebtoken         | Generating and verifying json web tokens                                  |
| nodemailer           | Mailing purpose.                                                          |
| multer               | File uploads                                                              |
| reflect-metadata     | Reflection library                                                        |
| typedi               | Dependency Injection                                                      |
| winston              | A powerful logger                                                         |
| zod                  | Validation library                                                        |
| typedi               | Dependency Injection                                                      |
| swc-register         | Swc for fast perf.                                                        |
