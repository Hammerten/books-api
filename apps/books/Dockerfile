FROM node:18 as development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN npm run build books

FROM node:18 as production

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production=true

COPY . .

RUN yarn add -D sequelize-cli
WORKDIR /usr/src/app/apps/auth
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all
WORKDIR /usr/src/app
RUN yarn remove sequelize-cli

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/books/main"]