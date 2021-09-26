// https://github.com/microsoft/TypeScript/issues/28308
type AudioWorkletProcessorType = {
	readonly port: MessagePort;
	process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
};
declare const AudioWorkletProcessor: {
	prototype: AudioWorkletProcessorType;
	new(options?: AudioWorkletNodeOptions): AudioWorkletProcessorType;
};
type ProcessorCtor = (new (options?: AudioWorkletNodeOptions) => AudioWorkletProcessorType);
declare function registerProcessor(name: string, processorCtor: ProcessorCtor): void;
declare const sampleRate: number;
declare const currentTime: number;

// Implementation
export type AudioWorkletState = {
	sampleRate: number;
	currentTime: number;
};
export type RunAudioWorkletOptions = {
	port: MessagePort;
	getState: () => AudioWorkletState;
};
export type AudioWorkletHandlers = {
	process: (input: Float32Array[], output: Float32Array[]) => void;
};

export const runAudioWorklet = (
	processorName: string,
	createHandlers: (options: RunAudioWorkletOptions) => AudioWorkletHandlers,
): void => {

	class InternalAudioWorkletProcessor extends AudioWorkletProcessor {
		handlers = createHandlers({
			port: this.port,
			getState: () => ({ sampleRate, currentTime }),
		})

		process([input]: Float32Array[][], [output]: Float32Array[][]): boolean {
			this.handlers.process(input, output);
			return true;
		}
	}

	registerProcessor(processorName, InternalAudioWorkletProcessor);
};
