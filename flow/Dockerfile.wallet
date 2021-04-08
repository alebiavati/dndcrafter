FROM node:12

ARG node_env=production

ENV NODE_ENV $node_env

WORKDIR /app

ADD package.json .
ADD yarn.lock .
RUN yarn install

ADD . .

ENTRYPOINT [ "yarn", "start" ]
