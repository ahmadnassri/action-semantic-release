# GitHub Action: Semantic Release

semantic-release as a GitHub Action, with all presets included

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![super linter][super-linter-img]][super-linter-url]
[![test][test-img]][test-url]
[![semantic][semantic-img]][semantic-url]

[`semantic-release`](https://semantic-release.gitbook.io/) as a GitHub Action, with **all** presets included.

  - works with environment variables as documented in [`semantic-release` docs](https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration#authentication)
  - customizable through [`semantic-release` configuration](https://semantic-release.gitbook.io/semantic-release/usage/configuration) options

## Usage

``` yaml
on:
  push:
    branches: [ master ]

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: checkout
        uses: actions/checkout@v2

      - name: semantic-release
        uses: ahmadnassri/action-semantic-release@v1
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Outputs

#### `published`

> default: `true`

`'true'` when release is successfully published, `'false'` when nothing is published

#### `last-release-git-head`

> default: `da39a3ee5e6b4b0d3255bfef95601890afd80709`

The sha of the last commit being part of the last release

#### `last-release-git-tag`

> default: `v1.0.0`

The Git tag associated with the last release

#### `last-release-channel`

> default: `next`

The distribution channel on which the last release was initially made available (`undefined` for the default distribution channel)

#### `last-release-version`

> default: `1.0.0`

The version of the last release

#### `last-release-version-major`

> default: `1`

last release version major component

#### `last-release-version-minor`

> default: `0`

last release version minor component

#### `last-release-version-patch`

> default: `0`

last release version patch component

#### `last-release-version-prerelease`

> default: `-`

last release version prerelease component

#### `last-release-version-buildmetadata`

> default: `-`

last release version buildmetadata component

#### `release-type`

> default: `N/A`

The semver type of the release (patch, minor or major)

#### `release-git-head`

> default: `68eb2c4d778050b0701136ca129f837d7ed494d2`

The sha of the last commit being part of the new release

#### `release-git-tag`

> default: `v1.1.0`

The Git tag associated with the new release

#### `release-version`

> default: `1.1.0`

The version of the new release.

#### `release-notes`

> default: `...`

The release notes for the new release

#### `release-channel`

> default: `next`

The distribution channel on which the next release will be made available (`undefined` for the default distribution channel)

#### `release-version-major`

> default: `1`

last release version major component

#### `release-version-minor`

> default: `1`

last release version minor component

#### `release-version-patch`

> default: `0`

last release version patch component

#### `release-version-prerelease`

> default: `N/A`

last release version prerelease component

#### `release-version-buildmetadata`

> default: `N/A`

last release version buildmetadata component

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/action-semantic-release

[release-url]: https://github.com/ahmadnassri/action-semantic-release/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/action-semantic-release

[super-linter-url]: https://github.com/ahmadnassri/action-semantic-release/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/action-semantic-release/workflows/super-linter/badge.svg

[test-url]: https://github.com/ahmadnassri/action-semantic-release/actions?query=workflow%3Atest
[test-img]: https://github.com/ahmadnassri/action-semantic-release/workflows/test/badge.svg

[semantic-url]: https://github.com/ahmadnassri/action-semantic-release/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
