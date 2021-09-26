export function WorkerUrl(url, options) {
	if (!options) return url;
	const { customPath } = options;
	if (!customPath) return url;
	return customPath();
}
