'use strict';
import {
	isWebp,
	isMobileCheck,
	dom,
	setHeight,
	menuInit
} from './modules/functions.js';
import './modules/popups.js';
import './modules/anchor-scroll.js';
import './modules/dynamic-adapt.js';
import './modules/spoilers.js';
import './modules/lazy-load-popup.js';

document.addEventListener('DOMContentLoaded', e => {
	isWebp();
	isMobileCheck();
	setHeight();

	// burger
	const burgerBtn = dom.burgerBtn;
	burgerBtn.addEventListener('click', e => {
		e.preventDefault();
		menuInit(e);
	});

	// sub list
	const subLinks = document.querySelectorAll('.sub-link');
	if (!isMobileCheck()) {
		// если это не тач
		if (subLinks.length > 0) {
			subLinks.forEach(subLink => {
				subLink.addEventListener('click', e => {
					e.preventDefault(); // делаем не рабочую ссылку
				});
				subLink.addEventListener('keydown', e => {
					if (e.keyCode === 13) {
						let li = e.target.parentNode;
						li.classList.toggle('active');
					}
				});
			});
		}
	} else {
		if (subLinks.length > 0) {
			subLinks.forEach(subLink => {
				subLink.parentNode.setAttribute('disable', ''); // убираем hover у li
				subLink.addEventListener('click', e => {
					e.preventDefault();
					// console.log(e.target.path);
					let li = e.target.parentNode;
					li.classList.toggle('active');
				});
			});
		}
	}
	dom.body.addEventListener('click', function (e) {
		// при клике не на li закрываем список
		if (!e.target.closest('.sub-li')) {
			subLinks.forEach(subLink => {
				if (subLink.parentNode.classList.contains('active')) {
					subLink.parentNode.classList.remove('active');
				}
			});
		}
	});

	function checkHeader() {
		if (scrollY > dom.header.offsetHeight) {
			if (!dom.header.classList.contains('fixed')) {
				dom.header.classList.add('fixed');
			}
		}
		if (scrollY === 0) {
			if (dom.header.classList.contains('fixed')) {
				dom.header.classList.remove('fixed');
			}
		}
	}
	checkHeader();
	document.addEventListener('scroll', checkHeader);
});
