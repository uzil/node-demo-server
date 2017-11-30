FROM node:6
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
COPY . .
CMD ["npm", "start"]