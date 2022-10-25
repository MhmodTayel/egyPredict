FROM node:16-alpine AS compiler

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./


FROM node:16-alpine

ENV BUILD_PACKAGES="libgcc libstdc++ python3 linux-headers make gcc g++ git libuv bash curl tar bzip2 build-base"

WORKDIR /app

COPY --from=compiler /app/package.json ./

RUN apk --update --no-cache add --virtual .builds-deps ${BUILD_PACKAGES} && \
    apk add ca-certificates && \
    npm install --only=prod && \
    chown -R node:node /app && \
    npm cache clean --force && \
    apk del .builds-deps && \
    rm -rf /var/cache/apk/* && \
    apk add --no-cache tzdata

COPY --from=compiler --chown=node:node /app/src ./src

USER node

CMD node .
