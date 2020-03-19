# MyDiploma-Api author Valerii Koshelev

### Version 0.1.0

## Description

### The package is a Yandex Praktikum project that contains the implementation of the backend part of the my diploma

## Where you can find me?

`84.201.136.82` (ip)


`https://api.mydiploma.website/` (domain for back part)

`https://www.api.mydiploma.website/` (domain for back part)

## Getting Started

### Download and run:

`git clone https://github.com/koshelev-valerii/mydiploma-api.git`


`npm install`

`npm run start` (for start)

`npm run dev` (for start with hot reload)

## Authentication

### Signup user

`POST /signup`

#### The required "Body"

`{

    "email": "email@ema.il",

    "password": "string",

    "name": "string"

}`

### Signin user

`POST /signin`

#### The required "Body"

`{

    "email": "email@ema.il",

    "password": "string"

}`

## API Resource "Articles"

### Get article list

`GET /articles`

### Create new article

`POST /articles`

#### The required "Body"

`{

    "keyword": "string",

    "title": "string",

    "text": "string",

    "date": "string",

    "source": "string",

    "link": "https://link.com",

    "image": "https://link.com"

}`

### Delete article by id

`DELETE /articles/:articleid`

## API Resource "Users"

### Get user information

`GET /users/me`
