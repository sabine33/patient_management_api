FROM node:latest
ARG DATABASE_URL=${DATABASE_URL}
RUN mkdir -p /usr/app/ppm
WORKDIR /usr/app/ppm
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY prisma ./
RUN yarn install
COPY . .
RUN yarn build
COPY src/emails /usr/app/ppm/build/src/emails
EXPOSE 4000
CMD [ "yarn","start" ]