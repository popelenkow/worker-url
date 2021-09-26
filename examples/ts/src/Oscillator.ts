const createWorklet = async (
	workletUrl: URL | string,
): Promise<AudioWorkletNode> => {
	const audioContext = new AudioContext();
	const options: AudioWorkletNodeOptions = {
		numberOfOutputs: 1,
		numberOfInputs: 0,
	};
	await audioContext.audioWorklet.addModule(workletUrl);
	const worklet = new AudioWorkletNode(audioContext, 'oscillator', options);
	worklet.connect(audioContext.destination);
	return worklet;
};
export type Oscillator = {
	start: () => void;
	stop: () => void;
};
export const createOscillator = async (
	workletUrl: URL | string,
): Promise<Oscillator> => {
	let worklet: AudioWorkletNode | undefined;
	
	const start = async () => {
		if (!worklet) worklet = await createWorklet(workletUrl);
		worklet.port.postMessage('start');
	};
	const stop = async () => {
		if (!worklet) worklet = await createWorklet(workletUrl);
		worklet.port.postMessage('stop');
	};
	return { start, stop };
};
