FROM node:20-alpine as build

WORKDIR /base

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

COPY ./packages/tools/db-migrate/package.json packages/tools/db-migrate/
RUN npm -w @lotr-armory/db-migrate ci

COPY ./packages/tools/db-migrate packages/tools/db-migrate/
RUN npm -w @lotr-armory/db-migrate run build

FROM node:20-alpine
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /usr/src/app
COPY --from=build /base .
WORKDIR /usr/src/app/packages/tools/db-migrate
USER node
CMD ["node", "dist/index.js"]
