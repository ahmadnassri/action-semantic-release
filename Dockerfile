# --- base stage --- #

FROM alpine:3.16 AS base

# hadolint ignore=DL3018
RUN apk add --no-cache --update nodejs npm git openssh ca-certificates ruby-bundler

# alpine has trust issues
RUN git config --global --add safe.directory '*'

WORKDIR /action

ENTRYPOINT [ "node" ]

# --- build stage --- #

FROM base AS build

# slience npm
# hadolint ignore=DL3059
RUN npm config set update-notifier=false audit=false fund=false

# keyscan github.com
RUN mkdir -p ~/.ssh && ssh-keyscan github.com >> /root/.ssh/known_hosts

# install packages
COPY action/package* ./
RUN npm ci --omit=dev --no-fund --no-audit

# --- app stage --- #

FROM base AS app

# copy from build image
COPY --from=build /root/.ssh/known_hosts /root/.ssh/known_hosts
COPY --from=build /action/node_modules ./node_modules

# copy files
COPY action ./

CMD ["--no-warnings=ExperimentalWarnings", "/action/index.js"]
