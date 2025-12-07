# JSONServer + JWT Auth

A Fake REST API using json-server with JWT authentication.

Implemented End-points: login,register

## Install

```bash
$ npm install
$ npm run start-auth
```

Might need to run

```
npm audit fix
```

## How to login/register?

You can login/register by sending a POST request to

```
POST http://localhost:8000/auth/login
```

with the following data

```
{
  "email": "qwe@email.com",
  "password":"qwe123%QWE"
}
```

```
POST http://localhost:8000/auth/register
```

with the following data

```
{
  "name": "Иван Стрельцов",
  "email": "ivan@spaceacademy.org",
  "password": "qwe123%QWE",
  "role": "student" || "teacher"
}
```

You should receive an access token and user data with the following format

```
{
   "access_token": "<ACCESS_TOKEN>",
   "user_data": {
        "id": 2,
        "name": "Мария Звёздная",
        "email": "maria@spaceacademy.org",
        "password": "qwe123%QWE",
        "role": "teacher"
    }
}
```

You should send this authorization with any request to the protected endpoints

```
Authorization: Bearer <ACCESS_TOKEN>
```
