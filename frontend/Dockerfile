FROM node:13-alpine

WORKDIR /app
ENV CI true
ENV REACT_APP_API_URL http://localhost:8080

COPY package.json .
RUN npm install

COPY . .
CMD ["npm", "start"]
