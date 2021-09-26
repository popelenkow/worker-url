const createWorklet = async (workletUrl) => {
	const audioContext = new AudioContext();
	const options = {
		numberOfOutputs: 1,
		numberOfInputs: 0,
	};
	await audioContext.audioWorklet.addModule(workletUrl);
	const worklet = new AudioWorkletNode(audioContext, 'oscillator', options);
	worklet.connect(audioContext.destination);
	return worklet;
};
export const createOscillator = async (workletUrl) => {
	let worklet;
	
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
