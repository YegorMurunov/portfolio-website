export const dom = {
	body: document.body,
	html: document.documentElement,
	wrapper: document.getElementById('wrapper'),
	header: document.querySelector('header.header'),
	burgerBtn: document.querySelector('.header__menu-btn')
};

const isMenu = dom.burgerBtn ? true : false; // условие, если есть burgerBtn то у нас есть меню в шапке

export function headerToggle() {
	bodyLockToggle();
	dom.html.classList.toggle('menu-open');
}

export function headerCloseMenu() {
	if (isMenu) {
		dom.html.classList.remove('menu-open');
		bodyUnlock();
	}
}

export const lockPadding = document.querySelectorAll('.lock-padding'); // для абсолютных элементов (шапка ...)
export let bodyLockStatus = true; // чтобы не было 2-ных нажатий
export const delay = 500; // 0.8 сукунды

export let bodyLockToggle = (delay = 500) => {
	if (dom.body.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
};

export function bodyLock(delay = 500) {
	if (bodyLockStatus) {
		const lockPaddingValue =
			window.innerWidth - document.querySelector('#wrapper').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			for (let i = 0; i < lockPadding.length; i++) {
				const el = lockPadding[i];
				el.style.paddingRight = lockPaddingValue;
			}
		}
		dom.body.style.paddingRight = lockPaddingValue;
		dom.body.classList.add('lock');

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

export function bodyUnlock(delay = 500) {
	if (bodyLockStatus) {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				for (let i = 0; i < lockPadding.length; i++) {
					const el = lockPadding[i];
					el.style.paddingRight = '0px';
				}
			}

			dom.body.style.paddingRight = '0px';
			dom.body.classList.remove('lock');
		}, delay);

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

export function menuInit(e) {
	if (bodyLockStatus && e.target.closest('.header__menu-btn')) {
		headerToggle();
	}
}

export function isMobileCheck() {
	const isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows()
			);
		}
	};
	if (isMobile.any()) {
		document.body.classList.add('touch');
		return true;
	} else {
		document.body.classList.add('pc');
		return false;
	}
}

export function isWebp() {
	function testWebP(callback) {
		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.body.classList.add(className);
	});
}

// Получение хеша в адресе сайта
export function getHash() {
	if (location.hash) {
		return location.hash.replace('#', '');
	}
}

export function randomInt(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

export function removeClass(arr, className = '_active') {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].classList.contains(className)) {
			arr[i].classList.remove(className);
		}
	}
}

// height: 100vh
export function setHeight() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	window.addEventListener('resize', setHeight);
}
// setHeight();
// window.addEventListener('resize', setHeight);

// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
export let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Создаем событие
			document.dispatchEvent(
				new CustomEvent('slideUpDone', {
					detail: {
						target: target
					}
				})
			);
		}, duration);
	}
};
export let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Создаем событие
			document.dispatchEvent(
				new CustomEvent('slideDownDone', {
					detail: {
						target: target
					}
				})
			);
		}, duration);
	}
};
export let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
};

// viber links
export function viberMobLinks() {
	const viberLinks = document.querySelectorAll('a.viber');
	viberLinks.forEach(viberLink => {
		viberLink.setAttribute('href', 'viber://add?number=380956954921');
	});
}
export function viberPcLinks() {
	const viberLinks = document.querySelectorAll('a.viber');
	viberLinks.forEach(viberLink => {
		viberLink.setAttribute('href', 'viber://chat?number=+380956954921');
	});
}

export function checkPhoneNumberUa(string) {
	// украинского номера
	if (/^\+380\d{3}\d{2}\d{2}\d{2}$/.test(string)) return true;
	return false;
}
