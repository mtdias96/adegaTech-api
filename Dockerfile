FROM node:22

WORKDIR /usr/src/api

RUN npm install -g pnpm

COPY . .

COPY ./.env.production ./.env

RUN pnpm install --quiet --no-optional --loglevel=error

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start:prod"]
