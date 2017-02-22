const barBottom = document.querySelector('.bar-bottom');
const picture = document.querySelector('.main-picture');

let scrollHeight = picture.scrollHeight;
let scrollTop = picture.scrollTop;

function setBottomBar() {
	barHeight = .3 * (picture.scrollHeight - picture.scrollTop);
	barBottom.style.height = `${barHeight}px`;
	barTop = picture.scrollHeight - barHeight;
	barBottom.style.marginTop = `${barTop}px`;
	console.log("scrollHeight: " + picture.scrollHeight + ", barHeight: ", barHeight + ", barTop: " + barTop);
}

window.addEventListener('scroll', setBottomBar);
window.onresize = setBottomBar;