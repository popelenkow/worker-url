declare const self: Worker;

export type RunWorkerOptions = {
	worker: Worker;
};
export const runSpectrumWorker = (
	createHandlers: (options: RunWorkerOptions) => void,
) => {
	const worker = self;
	createHandlers({ worker });
};
