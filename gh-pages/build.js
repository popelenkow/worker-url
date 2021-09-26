const copyfiles = require('copyfiles');

const err = (error) => error && console.error(error);

copyfiles(['../examples/js/dist/**/*', 'dist/js'], 4, err);
copyfiles(['../examples/ts/dist/**/*', 'dist/ts'], 4, err);
copyfiles(['../.gitignore', 'dist'], 1, err);
