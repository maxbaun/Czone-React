FROM node:9.8.0 as build

WORKDIR /app

COPY . . /app/

RUN npm install
RUN npm run build

FROM nginx:1.18-alpine as deploy
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/public .
ENTRYPOINT ["nginx", "-g", "daemon off;"]