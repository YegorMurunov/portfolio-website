import {
	dom,
	getHash,
	headerCloseMenu,
	headerToggle,
	isMobileCheck
} from './functions.js';
import { popupClose } from './popups.js';

const anchorLinks = document.querySelectorAll('.anchor-link');

// функция для скролла по хешу в url
let el = document.querySelector(`#${getHash()}`);
!el ? document.querySelector(`.${getHash()}`) : null;
if (el && !el.classList.contains('popup')) {
	scrollToSection(el, true, 5);
}

if (anchorLinks.length > 0) {
	anchorLinks.forEach(anchorLink => {
		anchorLink.addEventListener('click', function (e) {
			e.preventDefault();
			if (dom.html.classList.contains('menu-open')) {
				headerCloseMenu();
			} else if (document.querySelector('.popup.open')) {
				popupClose(document.querySelector('.popup.open'));
			}

			const id = this.getAttribute('href').substring(1);
			let scrollTarget = document.getElementById(id);

			if (scrollTarget) {
				scrollToSection(scrollTarget, true, 5);
			}
		});
	});
}

function scrollToSection(el, header = false, offset) {
	let topOffset = el.getBoundingClientRect().top + scrollY;

	header ? (topOffset -= dom.header.offsetHeight) : null;
	offset ? (topOffset -= offset) : null;
	// if (isMobileCheck()) {
	// 	topOffset -= dom.header.offsetHeight; // Если шапка фиксированная ( - dom.header.offsetHeight )
	// }

	window.scrollTo({
		top: topOffset,
		behavior: 'smooth'
	});
}
