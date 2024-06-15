import {
	dom,
	bodyLock,
	bodyUnlock,
	bodyLockStatus,
	headerCloseMenu,
	getHash
} from './functions.js';

// let bodyLockStatus = true; // чтобы не было 2-ных нажатий

// popups
const popupLinks = document.querySelectorAll('.popup-link');

if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		popupLinks[i].addEventListener('click', e => {
			e.preventDefault();

			if (dom.html.classList.contains('menu-open')) {
				headerCloseMenu();
			} else if (document.querySelector('.popup.open')) {
				popupClose(document.querySelector('.popup.open'));
			}

			const popupName = e.target.getAttribute('href').substring(1);
			const currentPopup = document.getElementById(popupName);

			popupOpen(currentPopup);
		});
	}
}

function popupOpen(currentPopup) {
	if (dom.html.classList.contains('menu-open')) {
		dom.html.classList.remove('menu-open');
	}
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(currentPopup, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');

		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
		let closeIcon = currentPopup.querySelector('.popup__close');
		closeIcon.addEventListener('click', () => {
			popupClose(currentPopup);
		});
	}
}

// close the popup by pressing the esc key
document.addEventListener('keydown', e => {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupActive ? popupClose(popupActive) : '';
	}
});

export function popupClose(popupActive, doUnlock = true) {
	if (bodyLockStatus) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

// функция для открытия popup по хешу в url
let hash = getHash();
let el = document.getElementById(hash);
if (el && el.classList.contains('popup')) {
	popupOpen(el);
}
