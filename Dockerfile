FROM node:16 as build-stage
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY ./ .
RUN npm run lint
RUN npm run build

FROM nginx:latest as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl.pem /etc/nginx/ssl.pem
COPY ssl.key /etc/nginx/ssl.key