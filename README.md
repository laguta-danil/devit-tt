## How to run manually

To launch backend part of the project you need to clone the github repository to your PC.

Then create .env file in root directory and copy text from .env.example to .env

On the next step you need to create (install and create DB) Postgressql 12, after that fill according to your data in
the following fields in .env file.

DATABASE_URL=

After that, in the project directory, use npm install in the terminal

in the first launch use npm run build its create a dist folder then always use

create prisma temptlate with

### 'npx prisma generate'

Now you can start the project with command

### 'npm run start:dev'

To launch front part of the project you need to clone the github repository to your PC.

Then create .env file in root directory and copy text from .env.example to .env

After that, in the project directory, use `npm install` in the terminal

Now you can start the project with

### `npm start`

When your start backend its generated user 'admin' automatically

You can use this credentials for access:

Login: admin
Passwod: admin

## How to run backend second way

1. Clone this repository
2. Install [Docker](https://docs.docker.com/get-docker/)
4. (Optional) Provide `.env` with port configuration for `.env.example`
5. Run `docker compose up -d`
6. Run frontend part! Visit (http://localhost:3000)






