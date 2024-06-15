import { _slideDown, _slideUp } from './functions.js';

const spoilerBlocks = document.querySelectorAll('[data-spoilers]');

let duration = 500; // duration in ms
let lockSpoiler = false;
let lastSpoiler = null;

const closeSpoiler = (spoiler, duration = duration) => {
	let spoilerContent = spoiler.querySelector('.spoilers-item__content');

	lockSpoiler = true;
	lastSpoiler = spoiler;
	_slideUp(spoilerContent, duration);
	setTimeout(() => {
		spoiler.removeAttribute('data-active');
		lockSpoiler = false;
		lastSpoiler = null;
	}, duration);
};

const openSpoiler = (spoiler, duration = duration) => {
	let spoilerContent = spoiler.querySelector('.spoilers-item__content');

	lockSpoiler = true;
	lastSpoiler = spoiler;
	spoiler.setAttribute('data-active', '');
	_slideDown(spoilerContent, duration);
	setTimeout(() => {
		lockSpoiler = false;
		lastSpoiler = null;
	}, duration);
};

if (spoilerBlocks) {
	spoilerBlocks.forEach(spoilerBlock => {
		// let spoilers = spoilerBlock.querySelectorAll('.spoilers-item');

		spoilerBlock.onclick = e => {
			if (e.target.closest('.spoilers-item__title')) {
				e.preventDefault();

				let spoiler = e.target.closest('.spoilers-item');
				let isAccordion = spoilerBlock.hasAttribute('data-accordion');

				if (
					(lockSpoiler && lastSpoiler == spoiler) ||
					(lockSpoiler && isAccordion)
				)
					return;

				if (spoiler.hasAttribute('data-active')) {
					closeSpoiler(spoiler, duration);
				} else {
					if (isAccordion) {
						let activeSpoiler = spoilerBlock.querySelector(
							'.spoilers-item[data-active]'
						);
						if (activeSpoiler) closeSpoiler(activeSpoiler, duration);
					}

					openSpoiler(spoiler, duration);
				}
			}
		};
	});
}
