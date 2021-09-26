export const createMessenger = (workerUrl) => {
	const worker = new Worker(workerUrl);
	const callbacks = [];
	worker.onmessage = (ev) => {
		const callback = callbacks.shift();
		callback(ev.data);
	};
	const send = (name) => {
		return new Promise((resolve) => {
			const callback = (result) => {
				resolve(result);
			};
			callbacks.push(callback);
			worker.postMessage(name);
		});
	};
	return {
		send,
	};
};
