# @yarnpkg/plugin-publishconfig ![Check](https://github.com/alizeait/yarn-plugin-publishconfig/workflows/Check/badge.svg) ![Coverage](https://img.shields.io/codecov/c/github/alizeait/yarn-plugin-publishconfig)

> Extend `publishConfig` to support any property

`publishConfig` is a set of config values that will be used at publish-time (or
pack-time). It's especially handy if you want to set different property values in
your package.json at publish/pack time than before. Yarn by default supports only a
[handful](https://yarnpkg.com/configuration/manifest#publishConfig) of
properties in `publishConfig`.
This plugin allows yarn to support any property starting with `$`.

## Install

```bash
yarn plugin import https://raw.githubusercontent.com/alizeait/yarn-plugin-publishconfig/master/bundles/@yarnpkg/plugin-publishconfig.js
```

## Usage

- Original `package.json`

```json
{
  "name": "packageName",
  "scripts": {
    "build": "build"
  },
  "main": "src/index.ts",
  "publishConfig": {
    // yarn supports `main` by default
    "main": "dist/index.js",
    // yarn does not support this by default
    "$oclif.commands": "dist/cli/commands"
  },
  "oclif": {
    "commands": "./cli/commands",
    "bin": "cmc"
  }
}
```

- `package.json` after publishing or packing

```json
{
  "name": "packageName",
  "scripts": {
    "build": "build"
  },
  // yarn replaces `main` with `publishConfig.main` by default
  "main": "./dist/index.ts",
  "publishConfig": {
    "main": "./dist/index.js",
    "$oclif.commands": "./dist/cli/commands"
  },
  // yarn now supports `publishConfig.$oclif.commands` and replaces `oclif.commands` with it
  "oclif": {
    "commands": "./dist/cli/commands",
    "bin": "cmc"
  }
}
```

You can use any supported replacement string by
[dset](https://github.com/lukeed/dset#usage). But keep in mind that each
property inside `publishConfig` has to start with `$` to be considered.

## Example

```json
{
  "publishConfig": {
    "main": "./dist/index.js",
    "$oclif.commands": "./dist/cli/commands",
    // supports arrays as well
    "$array.1.a.b.1": "./dist/cli/commands"
  }
}
```
