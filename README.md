<div align="center" style="text-align: center;">
  <h1 style="border-bottom: none;">fetch-as</h1>

  <p>Fetch data in Node.js</p>
</div>

<hr />

[![Version][version-badge]][version-url]
[![Node version][node-version-badge]][node-version-url]
[![MIT License][mit-license-badge]][mit-license-url]

[![Downloads][downloads-badge]][downloads-url]
[![Total downloads][total-downloads-badge]][downloads-url]
[![Packagephobia][packagephobia-badge]][packagephobia-url]
[![Bundlephobia][bundlephobia-badge]][bundlephobia-url]

[![Build Status][travis-badge]][travis-url]
[![CircleCI][circleci-badge]][circleci-url]
[![Dependency Status][daviddm-badge]][daviddm-url]
[![codecov][codecov-badge]][codecov-url]
[![Coverage Status][coveralls-badge]][coveralls-url]

[![codebeat badge][codebeat-badge]][codebeat-url]
[![Codacy Badge][codacy-badge]][codacy-url]
[![Code of Conduct][coc-badge]][coc-url]

> Fetch API in Node.js with specific response type

## Table of contents

- [Table of contents](#table-of-contents)
- [Pre-requisites](#pre-requisites)
- [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
    - [Node.js](#nodejs)
    - [Native ES modules or TypeScript](#native-es-modules-or-typescript)
- [API Reference](#api-reference)
  - [FetchAsInfo](#fetchasinfo)
  - [FetchAsReturnType](#fetchasreturntype)
  - [FetchAsData&lt;T&gt;](#fetchasdatalttgt)
  - [fetchAs](#fetchas)
  - [fetchAsArrayBuffer(url[, options])](#fetchasarraybufferurl-options)
  - [fetchAsBlob(url[, options])](#fetchasbloburl-options)
  - [fetchAsBuffer(url[, options])](#fetchasbufferurl-options)
  - [fetchAsJson(url[, options])](#fetchasjsonurl-options)
  - [fetchAsText(url[, options])](#fetchastexturl-options)
  - [fetchAsTextConverted(url[, options])](#fetchastextconvertedurl-options)
- [Additional typing file from `@types/node-fetch`](#additional-typing-file-from-typesnode-fetch)
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
//   fetchAsArrayBuffer,
//   fetchAsBlob,
//   fetchAsBuffer,
//   fetchAsJson,
//   fetchAsText,
//   fetchAsTextConverted,
// } = require('fetch-as');

async function runFetch() {
  const url = 'http://www.mocky.io/v2/5a50cfa82f000085158d5315';
  const jsonData = await fetchAs.json(url); // OR fetchAsJson(url);

  console.log('# json', jsonData.data);
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
/**
 * NOTE: Additional typings file from `node-fetch` is required
 * if user decides to create their own `options` and it is based on
 * `RequestInit` from `@types/node-fetch`.
 * 
 * Run the following command to install the additional typings:-
 * 
 * $ npm install --dev @types/node-fetch
 */
import { RequestInit } from 'node-fetch';

import fetchAs from 'fetch-as';
// OR import each method explicitly
// import {
//   fetchAsArrayBuffer,
//   fetchAsBlob,
//   fetchAsBuffer,
//   fetchAsJson,
//   fetchAsText,
//   fetchAsTextConverted,
// } from 'fetch-as';

async function runFetch() {
  const opts: RequestInit = {
    method: 'GET',
  };
  const url = 'http://www.mocky.io/v2/5a50cfa82f000085158d5315';
  const jsonData = await fetchAs.json(url, opts); // OR fetchAsJson(url);

  console.log('# json', jsonData.data);
  // {
  //   "status": 200,
  //   "message": "OK",
  //   "by": "fetch-as"
  // }
}

runFetch();
```

## API Reference

### FetchAsInfo

```ts
// Interface
{
  size: number;
  timeout: number;
  type: "basic"|"cors"|"default"|"error"|"opaque"|"opaqueredirect";
  headers: {
    [key: string]: any;
  };
}
```

### FetchAsReturnType

```ts
// Interface
{
  status: number;
  info: FetchAsInfo; // See `FetchAsInfo`.

  data?: any;
  error?: any;
}
```

### FetchAsData&lt;T&gt;

Response data returned in the type of `T` that extends [FetchAsReturnType][fetchasreturntype-url] by default where `data` and `error` is of type `any` and this is overridable by the user to decide what it returns. To do so, user can create interfaces in [TypeScript][typescript-url] like so:

```ts
declare interface MyReturnData {
  message: string;
}
declare interface MyReturnError {
  type: string;
  message: string;
}
declare interface MyReturnType extends FetchAsReturnType {
  data?: MyReturnData;
  error?: MyReturnError;
}

import { FetchAsReturnType } from 'fetch-as';

import { fetchAsJson } from 'fetch-as';

async function main() {
  const url = 'https://your-domain.com';
  const d = await fetchAsJson<MyReturnType>(url);

  assert(d.data.message, 'OK'); // OK
}

main();
```

- `status` <[string][string-mdn-url]> HTTP response status code. Any response that has a HTTP status greater than `399` can be regarded as an error response.
- `data` <?[Object][object-mdn-url]|[Buffer][buffer-nodejs-url]|[string][string-mdn-url]> This contains the successful response data of the user-specified type, for instance, `MyReturnData` in the example shown above. _**Only shows when the HTTP response status code is less than `400`.**_
- `error` <?[Object][object-mdn-url]|[Buffer][buffer-nodejs-url]|[string][string-mdn-url]> This contains the error response data of type `T`. _**Only shows when the HTTP response status code is greater than `399`.**_
- `info` <[Object][object-mdn-url]> This contains additional information you might need from a response. See [FetchAsInfo][fetchasinfo-url] for the detailed interface.
  - `size` <[number][number-mdn-url]> Response size.
  - `timeout` <[number][number-mdn-url]> Response timeout.
  - `type` <[string][string-mdn-url]> Response type. Possible values are: `basic`, `cors`, `default`, `error`, `opaque`, `opaqueredirect`.
  - `headers` <[Object][object-mdn-url]> Response headers, e.g. `{ 'content-type': 'application/json' }`.

___

### fetchAs

This contains a collection of methods that will convert the response into the specified data type:

- `.arrayBuffer(url[, options])` Method which will return a [ArrayBuffer][arraybuffer-mdn-url].
- `.blob(url[,options])` Method which will return a [Blob][blob-mdn-url].
- `.buffer(url[, options])` Method which will return a [Buffer][buffer-nodejs-url].
- `.json(url[, options])` Method which will return a JSON data which can consumed by JavaScript as [Object][object-mdn-url].
- `.text(url[, options])` Method which will return a text/ string.
- `.textConverted(url[, options])` Method which will return a text/ string, except instead of always converting to `UTF-8`, encoding sniffing will be performed and text converted to `UTF-8`, if possible.

### fetchAsArrayBuffer(url[, options])

- `url` <[string][string-mdn-url]> A string representing the URL for fetching.
- `options` <[?Object][object-mdn-url]> Options for HTTP(S) request. See [Options][node-fetch-options-url] for a list of supported options.
- returns: <[Promise][promise-mdn-url]<[FetchAsData][fetchasdatat-url]&lt;[ArrayBuffer][arraybuffer-mdn-url]&gt;> Promise which resolves with a [FetchAsData][fetchasdatat-url] of type [ArrayBuffer][arraybuffer-mdn-url].

### fetchAsBlob(url[, options])

- `url` <[string][string-mdn-url]> A string representing the URL for fetching.
- `options` <[?Object][object-mdn-url]> Options for HTTP(S) request. See [Additional typing file from `@types/node-fetch`][additional-typing-file-from-types-nodefetch-url] to see the explanation.
- returns: <[Promise][promise-mdn-url]<[FetchAsData][fetchasdatat-url]&lt;[Blob][blob-mdn-url]&gt;> Promise which resolves with a [FetchAsData][fetchasdatat-url] of type [Blob][blob-mdn-url].

### fetchAsBuffer(url[, options])

- `url` <[string][string-mdn-url]> A string representing the URL for fetching.
- `options` <[?Object][object-mdn-url]> Options for HTTP(S) request. See [Additional typing file from `@types/node-fetch`][additional-typing-file-from-types-nodefetch-url] to see the explanation.
- returns: <[Promise][promise-mdn-url]<[FetchAsData][fetchasdatat-url]&lt;[Buffer][buffer-nodejs-url]&gt;> Promise which resolves with a [FetchAsData][fetchasdatat-url] of type [Buffer][buffer-nodejs-url].

### fetchAsJson(url[, options])

- `url` <[string][string-mdn-url]> A string representing the URL for fetching.
- `options` <[?Object][object-mdn-url]> Options for HTTP(S) request. See [Additional typing file from `@types/node-fetch`][additional-typing-file-from-types-nodefetch-url] to see the explanation.
- returns: <[Promise][promise-mdn-url]<[FetchAsData][fetchasdatat-url]&lt;[Object][object-mdn-url]&gt;> Promise which resolves with a [FetchAsData][fetchasdatat-url] of type JSON which can consumed by JavaScript as [Object][object-mdn-url].

### fetchAsText(url[, options])

- `url` <[string][string-mdn-url]> A string representing the URL for fetching.
- `options` <[?Object][object-mdn-url]> Options for HTTP(S) request. See [Additional typing file from `@types/node-fetch`][additional-typing-file-from-types-nodefetch-url] to see the explanation.
- returns: <[Promise][promise-mdn-url]<[FetchAsData][fetchasdatat-url]&lt;[string][string-mdn-url]&gt;> Promise which resolves with a [FetchAsData][fetchasdatat-url] of type [string][string-mdn-url].

### fetchAsTextConverted(url[, options])

_* Please note that [encoding][encoding-url] is required to be installed in order to use this method._

- Identical to [fetchAsText(url[, options])][fetchastexturl-options-url], except instead of always converting to `UTF-8`, encoding sniffing will be performed and text converted to `UTF-8`, if possible.

## Additional typing file from `@types/node-fetch`

Run the following command to install `@types/node-fetch` if user decides to create their own `options`. It is based on `RequestInit` from the said package and it is not included as it is **only** required for [TypeScript][typescript-url] users

Otherwise, see [Options][node-fetch-options-url] for a list of supported options.

```sh
$ npm install --dev @types/node-fetch
```

## License

[MIT License](https://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->
[typescript-url]: https://github.com/Microsoft/TypeScript
[node-js-url]: https://nodejs.org
[npm-url]: https://www.npmjs.com
[node-releases-url]: https://nodejs.org/en/download/releases
[encoding-url]: https://www.npmjs.com/package/encoding
[node-fetch-options-url]: https://github.com/bitinn/node-fetch#fetch-options
[buffer-nodejs-url]: https://nodejs.org/api/buffer.html#buffer_buffer

[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[arraybuffer-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
[blob-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/API/Blob

[fetchasdatat-url]: #fetchasdatat
[fetchasreturntype-url]: #fetchasreturntype
[fetchasinfo-url]: #fetchasinfo
[fetchastexturl-options-url]: #fetchastexturl-options
[additional-typing-file-from-types-nodefetch-url]: #additional-typing-file-from-typesnode-fetch

<!-- Badges -->
[version-badge]: https://flat.badgen.net/npm/v/fetch-as
[node-version-badge]: https://flat.badgen.net/npm/node/fetch-as
[mit-license-badge]: https://flat.badgen.net/npm/license/fetch-as

[downloads-badge]: https://flat.badgen.net/npm/dm/fetch-as
[total-downloads-badge]: https://flat.badgen.net/npm/dt/fetch-as?label=total%20downloads
[packagephobia-badge]: https://flat.badgen.net/packagephobia/install/fetch-as
[bundlephobia-badge]: https://flat.badgen.net/bundlephobia/minzip/fetch-as

[travis-badge]: https://flat.badgen.net/travis/motss/fetch-as
[circleci-badge]: https://flat.badgen.net/circleci/github/motss/fetch-as
[daviddm-badge]: https://flat.badgen.net/david/dep/motss/fetch-as
[codecov-badge]: https://flat.badgen.net/codecov/c/github/motss/fetch-as?label=codecov
[coveralls-badge]: https://flat.badgen.net/coveralls/c/github/motss/fetch-as?label=coveralls

[codebeat-badge]: https://codebeat.co/badges/dad71df7-d5bc-4d45-9464-12fc305196bb
[codacy-badge]: https://api.codacy.com/project/badge/Grade/ef794f70204c452ca06427b2d1c072f6
[coc-badge]: https://flat.badgen.net/badge/code%20of/conduct/pink

<!-- Links -->
[version-url]: https://www.npmjs.com/package/fetch-as
[node-version-url]: https://nodejs.org/en/download
[mit-license-url]: https://github.com/motss/fetch-as/blob/master/LICENSE

[downloads-url]: http://www.npmtrends.com/fetch-as
[downloads-url]: http://www.npmtrends.com/fetch-as
[packagephobia-url]: https://packagephobia.now.sh/result?p=fetch-as
[bundlephobia-url]: https://bundlephobia.com/result?p=fetch-as

[travis-url]: https://travis-ci.org/motss/fetch-as
[circleci-url]: https://circleci.com/gh/motss/fetch-as/tree/master
[daviddm-url]: https://david-dm.org/motss/fetch-as
[codecov-url]: https://codecov.io/gh/motss/fetch-as
[coveralls-url]: https://coveralls.io/github/motss/fetch-as?branch=master

[codebeat-url]: https://codebeat.co/projects/github-com-motss-fetch-as-master
[codacy-url]: https://www.codacy.com/app/motss/fetch-as?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=motss/fetch-as&amp;utm_campaign=Badge_Grade
[coc-url]: https://github.com/motss/fetch-as/blob/master/CODE_OF_CONDUCT.md
