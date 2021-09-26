export const runAudioWorklet = (processorName, createHandlers) => {

	class InternalAudioWorkletProcessor extends AudioWorkletProcessor {
		handlers = createHandlers({
			port: this.port,
			getState: () => ({ sampleRate, currentTime }),
		})

		process([input], [output]) {
			this.handlers.process(input, output);
			return true;
		}
	}

	registerProcessor(processorName, InternalAudioWorkletProcessor);
};
