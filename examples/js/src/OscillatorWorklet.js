import { runAudioWorklet } from './AudioWorklet';

runAudioWorklet('oscillator', (options) => {
	const { port, getState } = options;
	const freq = 440;

	let isPlaying = false;
	port.onmessage = (ev) => {
		if (ev.data === 'start') isPlaying = true;
		if (ev.data === 'stop') isPlaying = false;
	};

	const process = (_input, output) => {
		if (!isPlaying) return;
		const { currentTime, sampleRate } = getState();
		output.forEach((channel) => {
			for (let i = 0; i < channel.length; i++) {
				const time = currentTime + i / sampleRate;
				channel[i] = Math.sin(2 * Math.PI * time * freq);
			}
		});
	};

	return {
		process,
	}
})