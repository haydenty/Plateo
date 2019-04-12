FROM node:latest

WORKDIR /usr/src
COPY package.json /usr/src/package.json
RUN npm install
COPY bower.json /usr/src/package.json
RUN bower install
COPY . /usr/src
EXPOSE 3000
CMD ["node", "server.js"]
