FROM node:latest
WORKDIR /usr/src/app
RUN npm install -g live-server
COPY . .
EXPOSE 8080
CMD ["live-server", "--host=0.0.0.0"]