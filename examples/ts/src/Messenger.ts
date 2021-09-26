export type Messenger = {
	send: (name: string) => Promise<string>;
};
export const createMessenger = (workerUrl: URL | string): Messenger => {
	const worker = new Worker(workerUrl);
	type Callback = (result: string) => void; 
	const callbacks: Callback[] = [];
	worker.onmessage = (ev) => {
		const callback = callbacks.shift()!;
		callback(ev.data);
	};
	const send = (name: string) => {
		return new Promise<string>((resolve) => {
			const callback = (result: string) => {
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
