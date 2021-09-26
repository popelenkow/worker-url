
export const runSpectrumWorker = (createHandlers) => {
	const worker = self;
	createHandlers({ worker });
};
