import { afterEach, vi } from 'vitest';

afterEach(() => {
	localStorage.clear();
	vi.restoreAllMocks();

	document.body.innerHTML = '';
	document.body.removeAttribute('style');
});
