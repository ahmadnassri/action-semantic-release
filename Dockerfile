# kics-scan disable=9bae49be-0aa3-4de5-bab2-4c3a069e40cd,67fd0c4a-68cf-46d7-8c41-bc9fba7e40ae

# --- base stage --- #

FROM alpine:3.19 AS base

# hadolint ignore=DL3018
RUN apk add --no-cache --update \
  npm=9.6.6-r0 \
  git=2.40.1-r0 \
  openssh=9.3_p2-r0 \
  ca-certificates=20230506-r0 \
  ruby-bundler=2.4.15-r0 \
  bash=5.2.15-r5

WORKDIR /action

# --- build stage --- #

FROM base AS build

# slience npm
# hadolint ignore=DL3059
RUN npm config set update-notifier=false audit=false fund=false

# keyscan github.com
RUN mkdir -p ~/.ssh && ssh-keyscan github.com >> /root/.ssh/known_hosts

# install packages
COPY package* ./
RUN npm ci --omit=dev --no-fund --no-audit

# --- app stage --- #

FROM base AS app

# copy from build image
COPY --from=build /root/.ssh/known_hosts /root/.ssh/known_hosts
COPY --from=build /action/node_modules ./node_modules

# copy files
COPY package.json src ./

HEALTHCHECK NONE

WORKDIR /github/workspace/

RUN git config --global --add safe.directory /github/workspace/

ENTRYPOINT [ "/action/entrypoint.sh" ]
