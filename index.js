const homeworkContainer = document.querySelector('#app');
const addDivButton = homeworkContainer.querySelector('#addDiv');

function createDiv() {
	const randomDiv = document.createElement('div');
	randomDiv.classList.add('draggable-div');
	randomDiv.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	randomDiv.style.width = (Math.random() * (100 - 30) + 30).toString() + 'px';
	randomDiv.style.height = (Math.random() * (100 - 30) + 30).toString() + 'px';
	randomDiv.style.borderRadius = '15%';
	randomDiv.draggable = true;

	const windowWidth = document.documentElement.clientWidth;
	const windowHeight = document.documentElement.clientHeight;
	const divWidth = parseInt(randomDiv.style.width) + 1;
	const divHeight = parseInt(randomDiv.style.height) + 1;

	randomDiv.style.left = Math.random() * (windowWidth - divWidth).toString() + 'px';
	randomDiv.style.top = Math.random() * (windowHeight - divHeight).toString() + 'px';

	return randomDiv;
}

addDivButton.addEventListener('click', function () {
	const div = createDiv();
	homeworkContainer.appendChild(div);
});

document.onmousedown = function (event) {
	if (!event.target.classList.contains('draggable-div')) {
		return;
	}

	const currentDiv = event.target;

	currentDiv.style.zIndex = 1000;

	let shiftX = event.clientX - currentDiv.getBoundingClientRect().left;
	let shiftY = event.clientY - currentDiv.getBoundingClientRect().top;

	moveAt(event.pageX, event.pageY);

	// переносит мяч на координаты (pageX, pageY),
	// дополнительно учитывая изначальный сдвиг относительно указателя мыши
	function moveAt(pageX, pageY) {
		currentDiv.style.left = pageX - shiftX + 'px';
		currentDiv.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}

	// (3) перемещать по экрану
	document.addEventListener('mousemove', onMouseMove);

	// (4) положить мяч, удалить более ненужные обработчики событий
	currentDiv.onmouseup = function () {
		document.removeEventListener('mousemove', onMouseMove);
		currentDiv.onmouseup = null;
	};

	currentDiv.ondragstart = function () {
		return false;
	};
};
