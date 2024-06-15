const numbersBlocks = document.querySelectorAll('.anim-numbers__wrapper'); // секция

const options = {
	// параметры наблюдателя
	root: null,
	threshold: 1
};

let observer = new IntersectionObserver(showAnim, options); // наблюдатель за элементом

function showAnim(entries, observer) {
	for (const entry of entries) {
		if (entry.intersectionRatio > 0) {
			let time = entry.target.getAttribute('data-time');
			if (!time) time = 1000;
			let animBlocks = entry.target.querySelectorAll('.anim-numbers__item');
			for (let i = 0; i < animBlocks.length; i++) {
				outNum(animBlocks[i], time, animBlocks[i].getAttribute('data-num'));
			}

			observer.unobserve(entry.target);
		}
	}
}

function outNum(elem, time = 1000, num) {
	// функция запуска анимации для каждого числа
	// const time = 1000; // время анимации в миллисекундах
	let step = 20; // шаг

	num = !num ? +elem.textContent : num;

	let n = 0;
	let t = Math.round(time / (num / step));
	let interval = setInterval(() => {
		if (num - n <= step) {
			step = 1;
		}
		n = n + step;
		if (n == num) {
			clearInterval(interval);
		}
		elem.textContent = n;
	}, t);
}

numbersBlocks.forEach(item => {
	observer.observe(item); // запускаем наблюдатель
});
