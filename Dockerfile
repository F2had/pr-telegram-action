FROM node:latest AS builder

WORKDIR /usr/src/app

# copy the app files to the container
COPY . .

# install dependencies
RUN npm install

# run build 
RUN npm run build

# run app 
CMD ["node", "./lib/main.js"]