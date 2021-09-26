import { WorkerUrl } from 'worker-url';
import { createMessenger } from './Messenger';
import { createOscillator } from './Oscillator';
import { getRoot, createInfoComponent, createWorkerComponent, createWorkletComponent } from './Components';

const init = async () => {
	const root = getRoot();

	const infoComponent = createInfoComponent();
	root.appendChild(infoComponent);

	const messengerUrl = new WorkerUrl(new URL('./MessengerWorker.ts', import.meta.url), {
		name: 'messenger',
		customPath: () => new URL('messenger.js', window.location.href),
	});
	const messenger = createMessenger(messengerUrl);
	const workerComponent = createWorkerComponent(messenger);
	root.appendChild(workerComponent);

	const oscillatorUrl = new WorkerUrl(new URL('./OscillatorWorklet.ts', import.meta.url), {
		name: 'oscillator',
		customPath: () => new URL('oscillator.js', window.location.href),
	});
	const oscillator = await createOscillator(oscillatorUrl);
	const workletComponent = createWorkletComponent(oscillator);
	root.appendChild(workletComponent);
};

init();
