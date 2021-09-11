/** @typedef {import("webpack").Compiler} Compiler */

module.exports.createWorkerUrlPlugin = () => {
	/**
	 * @param {Compiler} [compiler]
	 */
	return (compiler) => {
		compiler.hooks.environment.tap('WorkerUrlPlugin', () => {
			const { parser } = compiler.options.module;
			if (!parser.javascript) parser.javascript = {};
			const { javascript } = parser;
			if (!javascript.worker) javascript.worker = [];
			javascript.worker = [
				...javascript.worker.filter(x => x !== '...'),
				'WorkerUrl from WorkerUrl',
				'...',
			];
		});
	};
};
