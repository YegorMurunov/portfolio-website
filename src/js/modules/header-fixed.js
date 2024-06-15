import { dom } from './functions.js';
const header = dom.header;

export function fixedHeader() {
	if (pageYOffset > header.offsetHeight) {
		if (!header.classList.contains('fixed')) {
			header.classList.add('fixed');
		}
	}
	if (pageYOffset === 0) {
		if (header.classList.contains('fixed')) {
			header.classList.remove('fixed');
		}
	}
}
