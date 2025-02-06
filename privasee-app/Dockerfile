FROM node:16-alpine


WORKDIR /app

RUN npm install -g pnpm


COPY package.json package-lock.json ./


RUN npm install


COPY . .


EXPOSE 3000


CMD ["npm", "run", "dev"]
