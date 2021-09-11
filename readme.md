WorkerUrl

![License](https://img.shields.io/github/license/popelenkow/musetric)

Tool to generate worker and woklet bundles with webpack v5.

```bash
  npm i --save-dev worker-url
```

**webpack.config.js**
```js
const { WorkerUrlPlugin } = require('worker-url/plugin')

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

## Licence

WorkerUrl is [MIT licensed](licence.txt).