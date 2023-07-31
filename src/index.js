import core from '@actions/core'
import release from 'semantic-release'
import { resolve } from 'node:path'

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

// semver regex
const semver = /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

// error handler
function errorHandler ({ message, stack }) {
  core.error(message)
  core.debug(stack)
  process.exit(1)
}

// catch errors and exit
process.on('unhandledRejection', errorHandler)
process.on('uncaughtException', errorHandler)

// parse inputs
const inputs = {
  config: core.getInput('config'),
  dry: core.getBooleanInput('dry'),
  debug: core.getBooleanInput('debug'),
  format: core.getInput('format'),
  branches: core.getInput('branches')
}

const config = inputs.config ? require(resolve(inputs.config)) : {}

const options = {
  dryRun: inputs.dry,
  debug: inputs.debug
}

// only add these options if they have assigned value (otherwise, defaults will be applied)
if (inputs.format) options.tagFormat = inputs.format
if (inputs.branches) options.branches = inputs.branches

const result = await release({ ...config, ...options })

// exit early
if (!result) {
  core.setOutput('published', 'false')
  process.exit(0)
}

core.setOutput('published', inputs.dry ? 'false' : 'true')

// get result details
const { lastRelease, nextRelease } = result

lastRelease.parsed = semver.exec(lastRelease.version)

// outputs
core.setOutput('last-release-git-head', lastRelease.gitHead)
core.setOutput('last-release-git-tag', lastRelease.gitTag)
core.setOutput('last-release-channel', lastRelease.channel)
core.setOutput('last-release-version', lastRelease.version)

if (lastRelease.parsed) {
  core.setOutput('last-release-version-major', lastRelease.parsed.groups.major)
  core.setOutput('last-release-version-minor', lastRelease.parsed.groups.minor)
  core.setOutput('last-release-version-patch', lastRelease.parsed.groups.patch)
  core.setOutput('last-release-version-prerelease', lastRelease.parsed.groups.prerelease)
  core.setOutput('last-release-version-buildmetadata', lastRelease.parsed.groups.buildmetadata)
}

nextRelease.parsed = semver.exec(nextRelease.version)

core.setOutput('release-type', nextRelease.type)
core.setOutput('release-git-head', nextRelease.gitHead)
core.setOutput('release-git-tag', nextRelease.gitTag)
core.setOutput('release-version', nextRelease.version)
core.setOutput('release-notes', nextRelease.notes)
core.setOutput('release-channel', nextRelease.channel)
core.setOutput('release-version-major', nextRelease.parsed.groups.major)
core.setOutput('release-version-minor', nextRelease.parsed.groups.minor)
core.setOutput('release-version-patch', nextRelease.parsed.groups.patch)
core.setOutput('release-version-prerelease', nextRelease.parsed.groups.prerelease)
core.setOutput('release-version-buildmetadata', nextRelease.parsed.groups.buildmetadata)
