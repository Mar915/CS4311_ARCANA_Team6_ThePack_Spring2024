# node version 21.6.1
FROM node:21-alpine

WORKDIR /frontend

# getting dependencies
COPY package*.json .

# updating dependecies
RUN npm install

# saving everything
COPY . .

# the localport to use for the frontend
EXPOSE 3000

CMD [ "npm" , "start"]