FROM node:16-alpine3.12 as installer

LABEL mistricky "mist.zzh@gmail.com"

WORKDIR /workspace

COPY package.json ./
COPY yarn.lock ./

RUN yarn 

FROM node:16-alpine3.12

WORKDIR /workspace

COPY . .
COPY --from=installer /workspace/node_modules ./node_modules

RUN yarn build

ENTRYPOINT [ "yarn", "start" ]
