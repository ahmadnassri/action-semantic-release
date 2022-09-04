# GitHub Action: Semantic Release

semantic-release as a GitHub Action, with all presets included

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![semantic][semantic-img]][semantic-url]

[`semantic-release`](https://semantic-release.gitbook.io/) as a GitHub Action, with **all** presets included.

-   works with environment variables as documented in [`semantic-release` docs](https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration#authentication)
-   customizable through [`semantic-release` configuration file](https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration-file)

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
        uses: ahmadnassri/action-semantic-release@v2
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Inputs

| input      | required | default                                                                                      | description                                                      |
|------------|----------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| `config`   | ❌        | [see docs](https://semantic-release.gitbook.io/semantic-release/usage/configuration#options) | File path to configuration file                                  |
| `dry`      | ❌        | `false`                                                                                      | Execute in "dry-run" mode                                        |
| `debug`    | ❌        | `false`                                                                                      | Output debugging information                                     |
| `format`   | ❌        | [see docs](https://semantic-release.gitbook.io/semantic-release/usage/configuration#options) | The Git tag format used by semantic-release to identify releases |
| `branches` | ❌        | [see docs](https://semantic-release.gitbook.io/semantic-release/usage/configuration#options) | The branches on which releases should happen                     |

> ⚠️ ***Note**: only use `config` if you're using a non-standard [configuration file name](https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration-file) and in **JSON format***

### Outputs

| output                               | example  | description                                                                                                                     |
|--------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------|
| `published`                          | `true`   | `'true'` when release is successfully published, `'false'` when nothing is published                                            |
| `last-release-git-head`              | `d80709` | The sha of the last commit being part of the last release                                                                       |
| `last-release-git-tag`               | `v1.0.0` | The Git tag associated with the last release                                                                                    |
| `last-release-channel`               | `next`   | The distribution channel on which the last release was initially made available *(`null` for the default distribution channel)* |
| `last-release-version`               | `1.0.0`  | The version of the last release                                                                                                 |
| `last-release-version-major`         | `1`      | last release version major component                                                                                            |
| `last-release-version-minor`         | `0`      | last release version minor component                                                                                            |
| `last-release-version-patch`         | `0`      | last release version patch component                                                                                            |
| `last-release-version-prerelease`    | `-`      | last release version prerelease component                                                                                       |
| `last-release-version-buildmetadata` | `-`      | last release version buildmetadata component                                                                                    |
| `release-type`                       | `major`  | The semver type of the release (patch, minor or major)                                                                          |
| `release-git-head`                   | `d494d2` | The sha of the last commit being part of the new release                                                                        |
| `release-git-tag`                    | `v1.1.0` | The Git tag associated with the new release                                                                                     |
| `release-version`                    | `1.1.0`  | The version of the new release.                                                                                                 |
| `release-notes`                      | `...`    | The release notes for the new release                                                                                           |
| `release-channel`                    | `next`   | The distribution channel on which the next release will be made available *(`null` for the default distribution channel)*       |
| `release-version-major`              | `1`      | last release version major component                                                                                            |
| `release-version-minor`              | `1`      | last release version minor component                                                                                            |
| `release-version-patch`              | `0`      | last release version patch component                                                                                            |
| `release-version-prerelease`         | `-`      | last release version prerelease component                                                                                       |
| `release-version-buildmetadata`      | `-`      | last release version buildmetadata component                                                                                    |

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/action-semantic-release

[release-url]: https://github.com/ahmadnassri/action-semantic-release/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/action-semantic-release

[semantic-url]: https://github.com/ahmadnassri/action-semantic-release/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
