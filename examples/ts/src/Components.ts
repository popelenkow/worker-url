import type { Messenger } from './Messenger';
import type { Oscillator } from './Oscillator';

export const getRoot = () => {
	const result = document.getElementById('root')!;
	result.style.margin = '5px';
	result.style.display = 'flex';
	result.style.flexDirection = 'row';
	result.style.gap = '10px';
	return result;
};

export const createInfoComponent = () => {
	const result = document.createElement('div');
	result.style.border = 'solid';
	result.style.padding = '5px';
	result.style.display = 'flex';
	result.style.flexDirection = 'column';
	result.style.gap = '10px';

	const header = document.createElement('div');
	header.innerHTML = 'Info';
	header.style.fontSize = '30px';
	result.appendChild(header);

	const language = document.createElement('div');
	language.innerHTML = 'TS WorkerUrl Example';
	result.appendChild(language);
	
	const version = document.createElement('div');
	version.innerHTML = `worklet-url ${process.env.WorkerUrlVersion}`;
	result.appendChild(version);

	const githubLink = document.createElement('a');
	githubLink.innerHTML = 'Open Github';
	githubLink.href = 'https://github.com/popelenkow/worker-url';
	result.appendChild(githubLink);

	const srcLink = document.createElement('a');
	srcLink.innerHTML = 'Open Example Source';
	srcLink.href = 'https://github.com/popelenkow/worker-url/tree/main/examples/ts/';
	result.appendChild(srcLink);

	return result;
};

export const createWorkerComponent = (messenger: Messenger) => {
	const result = document.createElement('div');
	result.style.border = 'solid';
	result.style.padding = '5px';
	result.style.display = 'flex';
	result.style.flexDirection = 'column';
	result.style.gap = '10px';

	const header = document.createElement('div');
	header.innerHTML = 'Worker';
	header.style.fontSize = '30px';
	result.appendChild(header);

	const sendButton = document.createElement('button');
	sendButton.innerHTML = 'Send message';
	sendButton.onclick = async () => {
		const text = await messenger.send('world');
		const message = document.createElement('div');
		message.innerHTML = text;
		result.appendChild(message);
	};
	result.appendChild(sendButton);

	return result;
};

export const createWorkletComponent = (oscillator: Oscillator) => {
	const result = document.createElement('div');
	result.style.border = 'solid';
	result.style.padding = '5px';
	result.style.display = 'flex';
	result.style.flexDirection = 'column';
	result.style.gap = '10px';

	const header = document.createElement('div');
	header.innerHTML = 'Worklet';
	header.style.fontSize = '30px';
	result.appendChild(header);

	const startButton = document.createElement('button');
	startButton.innerHTML = 'Start';
	startButton.onclick = () => {
		oscillator.start();
	};
	result.appendChild(startButton);

	const stopButton = document.createElement('button');
	stopButton.innerHTML = 'Stop';
	stopButton.onclick = () => {
		oscillator.stop();
	};
	result.appendChild(stopButton);

	return result;
};
