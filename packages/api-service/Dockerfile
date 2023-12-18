FROM node:20-alpine as build

WORKDIR /base
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY ./packages/service-types/package.json packages/service-types/
COPY ./packages/api-service/package.json packages/api-service/
RUN yarn workspace @lotr-rtw/api-service install --frozen-lockfile
COPY ./packages/service-types packages/service-types/
COPY ./packages/api-service packages/api-service/
RUN yarn workspace @lotr-rtw/api-service build

FROM node:20-alpine
RUN apk --no-cache add curl
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /usr/app
COPY --chown=node:node --from=build /base .
WORKDIR /usr/app/packages/api-service
USER node
EXPOSE 8000

CMD if [ "${NODE_ENV}" = "production" ] ; \
      then node dist/index ; \
      else npm run start ; \
    fi
