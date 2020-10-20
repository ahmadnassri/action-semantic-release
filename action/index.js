const core = require('@actions/core')
const release = require('semantic-release')

const semver = /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

release()
  .then(result => {
    // exit early
    if (!result) return core.setOutput('published', 'false')

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

    core.setOutput('published', 'true')
    core.setOutput('release-type', nextRelease.type)
    core.setOutput('release-git-head', nextRelease.gitHead)
    core.setOutput('release-version', nextRelease.version)
    core.setOutput('release-version-major', nextRelease.parsed.groups.major)
    core.setOutput('release-version-minor', nextRelease.parsed.groups.minor)
    core.setOutput('release-version-patch', nextRelease.parsed.groups.patch)
    core.setOutput('release-version-prerelease', nextRelease.parsed.groups.prerelease)
    core.setOutput('release-version-buildmetadata', nextRelease.parsed.groups.buildmetadata)
    core.setOutput('release-git-tag', nextRelease.gitTag)
    core.setOutput('release-notes', nextRelease.notes)
    core.setOutput('release-channel', nextRelease.channel)
  })
  // catch error
  .catch(core.setFailed)
