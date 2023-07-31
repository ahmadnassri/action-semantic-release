#!/bin/sh

# this must be executed at run time, because github action runner changes $HOME value to /github/home
git config --global --add safe.directory "${GITHUB_WORKSPACE:=.}"

# normal execution
node --no-warnings=ExperimentalWarnings /action/index.js
