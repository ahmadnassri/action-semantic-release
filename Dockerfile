
FROM node:slim

RUN mkdir /action
WORKDIR /action

RUN apt-get update \
  && apt-get install -y --no-install-recommends git openssh-client ca-certificates \
  && apt-get purge -y --auto-remove \
  && rm -rf /var/lib/apt/lists/*

RUN git config --global url."https://github.com/".insteadOf git@github.com:
RUN git config --global url."https://".insteadOf git://

COPY package.json package-lock.json index.js /action/
RUN npm ci --only=prod

ENTRYPOINT ["node", "/action/index.js"]
