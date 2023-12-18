# Build
FROM node:20-alpine as build

WORKDIR /base
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY ./packages/service-types/package.json packages/service-types/
COPY ./packages/webapp/package.json packages/webapp/
RUN yarn workspace @lotr-rtw/webapp install --frozen-lockfile
COPY ./packages/service-types packages/service-types/
COPY ./packages/webapp packages/webapp/
RUN yarn workspace @lotr-rtw/webapp build

# Run
FROM nginx:alpine
COPY ./packages/webapp/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /base/packages/webapp/out /usr/share/nginx/html/webapp
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]