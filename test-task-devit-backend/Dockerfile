FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

COPY prisma ./prisma/

RUN npx prisma generate

RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "start:dev" ]