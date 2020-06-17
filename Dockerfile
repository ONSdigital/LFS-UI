FROM node:10 as react-build

WORKDIR /app

COPY package*.json ./
COPY /nginx.conf ./

RUN npm install --silent

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=react-build /app/build/ /usr/share/nginx/html

COPY --from=react-build /app/nginx.conf /etc/nginx/conf.d/default.conf


