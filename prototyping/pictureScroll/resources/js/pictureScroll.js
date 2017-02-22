const barTop =  document.querySelector('.bar-top');
const barBottom = document.querySelector('.bar-bottom');
const picture = document.querySelector('.main-picture');

// let scrollHeight = picture.scrollHeight;
// let scrollTop = picture.scrollTop;

function setBarSizes() {
	let barHeight = .3 * (picture.clientHeight - picture.scrollTop);
	let barTopMargin = picture.clientHeight - barHeight;
	barBottom.style.height = `${barHeight}px`;
	barTop.style.height = `${barHeight}px`;
	barBottom.style.marginTop = `${barTopMargin}px`;
	console.log("clientHeight: " + picture.clientHeight + ", barHeight: ", barHeight + ", barTop: " + barTop);
}

setBarSizes();
window.scrollTo(0,0);
window.addEventListener('scroll', setBarSizes);
window.onresize = setBarSizes;