# WorkerUrl

[![example branch parameter](https://github.com/popelenkow/worker-url/actions/workflows/worker-url.yml/badge.svg?branch=main)](https://github.com/popelenkow/worker-url/actions/workflows/worker-url.yml)
[![npm version](https://img.shields.io/npm/v/worker-url)](https://www.npmjs.com/package/worker-url)
![License](https://img.shields.io/github/license/popelenkow/musetric)

Tool to generate worker and woklet bundles with webpack v5.

```bash
npm i --save-dev worker-url
```

**webpack.config.js**
```js
const WorkerUrlPlugin = require('worker-url/plugin');

module.exports = {
  output: {
    publicPath: '/',
  },
  plugins: [
    new WorkerUrlPlugin(),
  ],
};
```

**index.js**
```js
import { WorkerUrl } from 'worker-url';

const workerUrl = new WorkerUrl(new URL('./worker.js', import.meta.url), {
  name: 'worker',
});
const worker = new Worker(workerUrl);

const workletUrl = new WorkerUrl(new URL('./worklet.js', import.meta.url), {
  name: 'worklet',
});
audioContext.audioWorklet.addModule(workletUrl);
```

**index.ts**
```js
import { WorkerUrl } from 'worker-url';

const workerUrl = new WorkerUrl(new URL('./worker.ts', import.meta.url), {
  name: 'worker',
});
const worker = new Worker(workerUrl);

const workletUrl = new WorkerUrl(new URL('./worklet.ts', import.meta.url), {
  name: 'worklet',
});
audioContext.audioWorklet.addModule(workletUrl);
```

## Custom path

It is possible to set the relative path using the webpack `publicPath`:

**webpack.config.js**
```js
const WorkerUrlPlugin = require('worker-url/plugin');

module.exports = {
  output: {
    publicPath: '/myRelativePath/',
  },
};
```

If the webpack configuration does not solve the problem, then you can use runtime routing with `customPath`:

**index.js**
```js
const workerUrl = new WorkerUrl(new URL('./worker.js', import.meta.url), {
  name: 'worker',
  // Override original url
  customPath: () => {
    // Use any code
    return new URL('worker.js', window.location.href);
  },
});
```

**index.ts**
```ts
const workerUrl = new WorkerUrl(new URL('./worker.ts', import.meta.url), {
  name: 'worker',
  // Override original url
  customPath: () => {
    // Use any code
    return new URL('worker.js', window.location.href);
  },
});
```

## Examples

Demo | Source
--- | ---
[JS WorkerUrl](https://popelenkow.github.io/worker-url/js/) | [./js](https://github.com/popelenkow/worker-url/tree/main/examples/js/)
[TS WorkerUrl](https://popelenkow.github.io/worker-url/ts/) | [./ts](https://github.com/popelenkow/worker-url/tree/main/examples/ts/)

## What is the package for?

As of webpack 5, you can use Web Workers without external packages: \
https://webpack.js.org/guides/web-workers/ \
The webpack offers a way to generate a Worker directly. The worker-url provides a flexible configuration of the project by generating URL instead of a Worker.

There is a problem with Worklet generation: \
https://github.com/webpack/webpack/issues/11543 \
The worker-url allows you to generate Worklet URL in the same way as you generate Worker URL.

## License

worker-url is [MIT licensed](https://github.com/popelenkow/worker-url/blob/main/license.md).