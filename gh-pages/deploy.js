const ghPages = require('gh-pages');

ghPages.publish('dist', {
	dotfiles: true,
	history: false,
	message: 'Deploy Musetric Application'
}, (err) => {
	console.error(err);
});
