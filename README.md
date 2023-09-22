# WorkAdventure Scripting API Extra features

![Github Actions](https://github.com/workadventure/scripting-api-extra/workflows/Release/badge.svg) [![codecov](https://codecov.io/gh/workadventure/scripting-api-extra/branch/main/graph/badge.svg?token=UCCA6D6JCB)](https://codecov.io/gh/workadventure/scripting-api-extra)

This NPM package contains a set of reusable utility functions and features that can be used to enhance WorkAdventure maps.

## Usage

There are many ways to import the `@workadventure/scripting-api-extra` package.

### Importing directly in a map

If you only want to use the extra "features", you can directly import the package in your map,
by adding a "script" property at the map level, pointing to the "bundled" package:

`script: https://unpkg.com/@workadventure/scripting-api-extra@^1/dist/bundle.js`

Please note that you can change the version number of the package in the URL.

### Importing in your application / own scripts

If you are developing your own scripts, you can import the library using NPM.

```
npm install --save @workadventure/scripting-api-extra
```

## Table of content

### Features

- [Doors](docs/doors.md)
- [Bells](docs/bells.md)
- [Generic action layers](docs/generic-action-layers.md)

### Functions

- [`Properties`](docs/functions-properties.md) related functions (utility functions to acces properties...)
- [`Variables`](docs/functions-variables.md) related functions (access variables metadata...)
- [`Layers`](docs/functions-layers.md) related functions (get a list of all layers, find layers boundaries...)

## Contributing

```console
# install dependencies
$ npm install

# run unit tests
$ npm run tests

# run integration tests
$ npm run start  # then browse to http://localhost:3000/test/maps/
```

Note: `npm run start` will connect to `play.workadventu.re` to server WorkAdventure.

If for development purpose, you want to connect to a development WorkAdventure server, you can use the `WORKADVENTURE_URL` environment variable:

```console
$ WORKADVENTURE_URL="http://play.workadventure.localhost" npm run start
```
