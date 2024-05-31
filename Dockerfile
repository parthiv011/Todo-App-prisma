FROM node:18-alpine

WORKDIR /app

COPY . .

# Ensure the .env file is copied
COPY .env .env

RUN npm install
RUN npm run build
RUN npx prisma generate

EXPOSE 3000

CMD [ "node", "dist/index.js" ]