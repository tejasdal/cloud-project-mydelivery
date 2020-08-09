FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm -g install sails
COPY . /app
ENTRYPOINT ["sails"]
CMD node app.js
EXPOSE 1337