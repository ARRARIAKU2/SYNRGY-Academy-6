FROM node:20-alpine as build-image
WORKDIR /usr/src/app
COPY package*.json ./ 
COPY tsconfig*.json ./
COPY ./ ./
RUN npm ci
RUN npx tsc -p .

FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build-image ./usr/src/app/dist ./dist
RUN npm ci --production
COPY . .
EXPOSE 8000
CMD ["node", "dist/index.js"]

# docker buildx build -t backend:latest -f Dockerfile .