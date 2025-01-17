// lazy load popup img ==================================
const lazyImages = document.querySelectorAll('.lazy-load');
let loadedImg = [];

// options
const options = {
	root: null, // Элемент который используется в качестве области просмотра для проверки видимости элемента
	rootMargin: '0px', // rootMargin: '-50% 0% 0% 0%', // Отступы вокруг root
	threshold: 1 // Число, указывающие, при каком проценте видимости целевого элемента должен сработать callback
};

// function handleImg
function handleImg(images, observer) {
	images.forEach(img => {
		if (img.intersectionRatio > 0) {
			loadImg(img.target);
		}
	});
}
// function loadImg
function loadImg(img) {
	let src = img.dataset.src;

	if (loadedImg.indexOf(src) == -1) {
		img.src = src;
		loadedImg.push(src);
		// for webp
		if (
			img.previousElementSibling &&
			img.previousElementSibling.tagName == 'SOURCE'
		) {
			let webp = img.previousElementSibling;
			src = webp.dataset.srcset;
			webp.setAttribute('srcset', src);
		}
		img.onload = () => {
			let popup = img.closest('.popup');
			if (popup.querySelectorAll('.lazy-load').length > 1) {
				popup.querySelectorAll('.lazy-load').forEach(img => {
					if (img.src == img.dataset.src) {
						return;
					}
					img.src = img.dataset.src;
					loadedImg.push(src);
					if (
						img.previousElementSibling &&
						img.previousElementSibling.tagName == 'SOURCE'
					) {
						let webp = img.previousElementSibling;
						webp.setAttribute('srcset', webp.dataset.srcset);
					}
				});
			}
			popup.classList.remove('loading');
			return img;
		};
	}
}

// observer
const observer = new IntersectionObserver(handleImg, options);

// запускаем observer
if (lazyImages.length > 0) {
	lazyImages.forEach(img => {
		observer.observe(img);
	});
}
