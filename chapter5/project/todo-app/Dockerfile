FROM node:22-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

RUN rm -rf dist
COPY --from=frontend-build /app/frontend/dist ./dist

CMD ["node", "server.js"]