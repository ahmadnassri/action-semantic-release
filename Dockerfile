FROM node:14.15.0-slim

LABEL com.github.actions.name="Conventional Semantic Release" \
      com.github.actions.description="Semantic Release with all the presets" \
      com.github.actions.icon="package" \
      com.github.actions.color="red" \
      maintainer="Ahmad Nassri <ahmad@ahmadnassri.com>" \
      org.opencontainers.image.url="https://github.com/ahmadnassri/action-semantic-release" \
      org.opencontainers.image.source="https://github.com/ahmadnassri/action-semantic-release" \
      org.opencontainers.image.documentation="https://github.com/ahmadnassri/action-semantic-release"

RUN mkdir /action
WORKDIR /action

RUN apt-get update \
  && apt-get install -y --no-install-recommends git openssh-client ca-certificates ruby-full gettext-base \
  && apt-get purge -y --auto-remove \
  && rm -rf /var/lib/apt/lists/* \
  && gem install bundler

COPY action ./

RUN npm ci --only=prod

ENTRYPOINT ["node", "/action/index.js"]
