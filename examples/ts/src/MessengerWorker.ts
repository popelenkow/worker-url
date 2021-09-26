import { runSpectrumWorker } from './Worker';

runSpectrumWorker((options) => {
	const { worker } = options;
	worker.onmessage = (ev) => {
		worker.postMessage(`Hello, ${ev.data}!`);
	};
});