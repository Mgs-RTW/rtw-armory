# Build
FROM node:20-alpine as build

WORKDIR /base

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

COPY ./packages/service-types/package.json packages/service-types/
COPY ./packages/webapp/package.json packages/webapp/
RUN npm -w @lotr-rtw/service-types ci
RUN npm -w @lotr-rtw/webapp ci
COPY ./packages/service-types packages/service-types/
COPY ./packages/webapp packages/webapp/
RUN npm -w @lotr-rtw/service-types run build
RUN npm -w @lotr-rtw/webapp run build

# Run
FROM nginx:alpine
#COPY ./packages/webapp/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /base/packages/webapp/out /usr/share/nginx/html/webapp
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]