type WorkerUrlOptions =
	& WorkerOptions
	& {
		/** Override original url */
		customPath?: () => URL;
	};
export declare const WorkerUrl: {
	prototype: URL;
	new(scriptURL: URL, options?: WorkerUrlOptions): URL;
};