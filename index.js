const core = require('@actions/core')
const release = require('semantic-release')

release()
  .then(result => {
    // exit early
    if (!result) return core.setOutput('published', 'false')

    // get result details
    const { lastRelease, nextRelease } = result

    // outputs
    core.setOutput('last-release-git-head', lastRelease.gitHead)
    core.setOutput('last-release-version', lastRelease.version)
    core.setOutput('last-release-git-tag', lastRelease.gitTag)
    core.setOutput('last-release-channel', lastRelease.channel)

    core.setOutput('published', 'true')
    core.setOutput('release-type', nextRelease.type)
    core.setOutput('release-git-head', nextRelease.gitHead)
    core.setOutput('release-version', nextRelease.version)
    core.setOutput('release-git-tag', nextRelease.gitTag)
    core.setOutput('release-notes', nextRelease.notes)
    core.setOutput('release-channel', nextRelease.channel)
  })
  // catch error
  .catch(core.setFailed)
