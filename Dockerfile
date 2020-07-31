FROM node:slim

LABEL com.github.actions.name="Conventional Semantic Release" \
      com.github.actions.description="Semantic Release with all the presets" \
      com.github.actions.icon="package" \
      com.github.actions.color="red" \
      maintainer="Ahmad Nassri <ahmad@ahmadnassri.com>"

RUN mkdir /action
WORKDIR /action

RUN apt-get update \
  && apt-get install -y --no-install-recommends git openssh-client ca-certificates \
  && apt-get purge -y --auto-remove \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json index.js /action/
RUN npm ci --only=prod

ENTRYPOINT ["node", "/action/index.js"]
