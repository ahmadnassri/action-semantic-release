FROM node:18-slim

LABEL com.github.actions.name="Conventional Semantic Release" \
      com.github.actions.description="Semantic Release with all the presets" \
      com.github.actions.icon="package" \
      com.github.actions.color="red" \
      maintainer="Ahmad Nassri <ahmad@ahmadnassri.com>"

# set working dir
RUN mkdir /action
WORKDIR /action

RUN apt-get update \
  && apt-get install -y --no-install-recommends git openssh-client ca-certificates ruby-full \
  && apt-get purge -y --auto-remove \
  && rm -rf /var/lib/apt/lists/* \
  && gem install bundler

# install packages
COPY action/package* ./
RUN npm ci --omit=dev --no-fund --no-audit

# keyscan github.com
RUN mkdir -p ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

# copy files
COPY action ./

# set entry point
ENTRYPOINT ["node", "--no-warnings=ExperimentalWarnings", "/action/index.js"]
