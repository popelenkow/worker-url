import { WorkerUrl } from 'worker-url';
import { createMessenger } from './Messenger';
import { createOscillator } from './Oscillator';
import { getRoot, createInfoComponent, createWorkerComponent, createWorkletComponent } from './Components';

const init = async () => {
	const root = getRoot();

	root.appendChild(createInfoComponent());

	const messengerUrl = new WorkerUrl(new URL('./MessengerWorker.js', import.meta.url), {
		name: 'messenger',
	});
	const messenger = createMessenger(messengerUrl);
	const workerComponent = createWorkerComponent(messenger);
	root.appendChild(workerComponent);

	const oscillatorUrl = new WorkerUrl(new URL('./OscillatorWorklet.js', import.meta.url), {
		name: 'oscillator',
	});
	const oscillator = await createOscillator(oscillatorUrl);
	const workletComponent = createWorkletComponent(oscillator);
	root.appendChild(workletComponent);
};

init();
