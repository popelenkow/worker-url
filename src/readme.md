WorkerUrl

[![example branch parameter](https://github.com/popelenkow/worker-url/actions/workflows/worker-url.yml/badge.svg?branch=main)](https://github.com/popelenkow/worker-url/actions/workflows/worker-url.yml)
[![npm version](https://img.shields.io/npm/v/worker-url)](https://www.npmjs.com/package/worker-url)
![License](https://img.shields.io/github/license/popelenkow/musetric)

Tool to generate worker and woklet bundles with webpack v5.

```bash
  npm i --save-dev worker-url
```

**webpack.config.js**
```js
const WorkerUrlPlugin = require('worker-url/plugin')

module.exports = {
  plugins: [
    new WorkerUrlPlugin()
  ]
}
```

**index.js**
```js
const { WorkerUrl } = require('worker-url')

const url = new WorkerUrl(new URL('./worker.js', import.meta.url), {
  name: 'worker',
});
```

## License

WorkerUrl is [MIT licensed](https://github.com/popelenkow/worker-url/blob/main/license.md).