<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">fetch-as</h1>

  <p>Fetch data in Node.js</p>
</div>

<hr />

[![NPM][nodei-badge]][nodei-url]

[![Build Status][travis-badge]][travis-url]
[![Version][version-badge]][version-url]
[![Downloads][downloads-badge]][downloads-url]
[![MIT License][mit-license-badge]][mit-license-url]
[![Dependency Status][daviddm-badge]][daviddm-url]
[![NSP Status][nsp-badge]][nsp-url]

[![Code of Conduct][coc-badge]][coc-url]
[![Codecov][codecov-badge]][codecov-url]
[![Coverage Status][coveralls-badge]][coveralls-url]

[![codebeat-badge]][codebeat-url]
[![codacy-badge]][codacy-url]
[![inch-badge]][inch-url]

> Fetch API in Node.js with specific response type

## Table of contents

- [Pre-requisites](#pre-requisites)
- [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
    - [Node.js](#nodejs)
    - [Native ES modules or TypeScript](#native-es-modules-or-typescript)
- [API Reference](#api-reference)
  - [fetchAs](#fetchas)
  - [fetchAsBuffer(url[, options])](#fetchasbufferurl-options)
  - [fetchAsJson(url[, options])](#fetchasjsonurl-options)
  - [fetchAsText(url[, options])](#fetchastexturl-options)
- [License](#license)

## Pre-requisites

- [Node.js][node-js-url] >= 8.9.0
- [NPM][npm-url] >= 5.5.1 ([NPM][npm-url] comes with [Node.js][node-js-url] so there is no need to install separately.)

## Setup

### Install

```sh
# Install via NPM
$ npm install --save fetch-as
```

### Usage

#### Node.js

```js
const { fetchAs } = require('fetch-as');
// OR require each method explicitly
// const {
//   fetchAsBuffer,
//   fetchAsJson,
//   fetchAsText,
// } = require('fetch-as');

async function runFetch() {
  const url = 'http://www.mocky.io/v2/5a50cfa82f000085158d5315';
  const jsonData = await fetchAs.json(url); // OR fetchAsJson(url);

  console.log('# json', jsonData);
  // {
  //   "status": 200,
  //   "message": "OK",
  //   "by": "fetch-as"
  // }
}

runFetch();
```

#### Native ES modules or TypeScript

```ts
import fetchAs from 'fetch-as';
// OR import each method explicitly
// import {
//   fetchAsBuffer,
//   fetchAsJson,
//   fetchAsText,
// } from 'fetch-as';

async function runFetch() {
  const url = 'http://www.mocky.io/v2/5a50cfa82f000085158d5315';
  const jsonData = await fetchAs.json(url); // OR fetchAsJson(url);

  console.log('# json', jsonData);
  // {
  //   "status": 200,
  //   "message": "OK",
  //   "by": "fetch-as"
  // }
}

runFetch();
```

## API Reference

### fetchAs

This contains a collection of methods that will convert the response into the specified data type:

- `.buffer(url[, options])` Method which will return a [Buffer][buffer-nodejs-url].
- `.json(url[, options])` Method which will return a JSON data which can consumed by JavaScript as [Object][object-mdn-url].
- `.text(url[, options])` Method which will return a text/ string.

### fetchAsBuffer(url[, options])

  - name <[string][string-mdn-url]> Name of the person to greet at.
  - options <[Object][object-mdn-url]> Options for HTTP(S) request. See [Options][node-fetch-options-url] for a list of supported options.
  - returns: <[Promise][promise-mdn-url]<[Buffer][buffer-nodejs-url]>> Promise which resolves with a Buffer.
  - 
### fetchAsJson(url[, options])

  - name <[string][string-mdn-url]> Name of the person to greet at.
  - options <[Object][object-mdn-url]> Options for HTTP(S) request. See [Options][node-fetch-options-url] for a list of supported options.
  - returns: <[Promise][promise-mdn-url]<[Object][object-mdn-url]>> Promise which resolves with a JSON data which can consumed by JavaScript as [Object][object-mdn-url].
  - 
### fetchAsText(url[, options])

  - name <[string][string-mdn-url]> Name of the person to greet at.
  - options <[Object][object-mdn-url]> Options for HTTP(S) request. See [Options][node-fetch-options-url] for a list of supported options.
  - returns: <[Promise][promise-mdn-url]<[string][string-mdn-url]>> Promise which resolves with a text/ string.

## License

[MIT License](https://motss.mit-license.org/) © Rong Sen Ng



[typescript-url]: https://github.com/Microsoft/TypeScript
[node-js-url]: https://nodejs.org
[npm-url]: https://www.npmjs.com
[node-releases-url]: https://nodejs.org/en/download/releases
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[node-fetch-options-url]: https://github.com/bitinn/node-fetch#fetch-options
[buffer-nodejs-url]: https://nodejs.org/api/buffer.html#buffer_buffer



[nodei-badge]: https://nodei.co/npm/fetch-as.png?downloads=true&downloadRank=true&stars=true

[travis-badge]: https://img.shields.io/travis/motss/fetch-as.svg?style=flat-square

[version-badge]: https://img.shields.io/npm/v/fetch-as.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/fetch-as.svg?style=flat-square
[mit-license-badge]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square
[nsp-badge]: https://nodesecurity.io/orgs/motss/projects/322b0452-d468-424a-affe-5c20c79b0f61/badge
[daviddm-badge]: https://img.shields.io/david/expressjs/express.svg?style=flat-square

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[codecov-badge]: https://codecov.io/gh/motss/fetch-as/branch/master/graph/badge.svg
[coveralls-badge]: https://coveralls.io/repos/github/motss/fetch-as/badge.svg?branch=master

[codebeat-badge]: https://codebeat.co/badges/dad71df7-d5bc-4d45-9464-12fc305196bb
[codacy-badge]: https://api.codacy.com/project/badge/Grade/ef794f70204c452ca06427b2d1c072f6
[inch-badge]: http://inch-ci.org/github/motss/fetch-as.svg?branch=master



[nodei-url]: https://nodei.co/npm/fetch-as

[travis-url]: https://travis-ci.org/motss/fetch-as
[version-url]: https://npmjs.org/package/fetch-as
[downloads-url]: http://www.npmtrends.com/fetch-as
[mit-license-url]: https://github.com/motss/fetch-as/blob/master/LICENSE
[nsp-url]: https://nodesecurity.io/orgs/motss/projects/322b0452-d468-424a-affe-5c20c79b0f61
[daviddm-url]: https://david-dm.org/motss/fetch-as

[coc-url]: https://github.com/motss/fetch-as/blob/master/CODE_OF_CONDUCT.md
[codecov-url]: https://codecov.io/gh/motss/fetch-as
[coveralls-url]: https://coveralls.io/github/motss/fetch-as?branch=master

[codebeat-url]: https://codebeat.co/projects/github-com-motss-fetch-as-master
[codacy-url]: https://www.codacy.com/app/motss/fetch-as?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=motss/fetch-as&amp;utm_campaign=Badge_Grade
[inch-url]: http://inch-ci.org/github/motss/fetch-as
