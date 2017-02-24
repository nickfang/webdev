const barTop =  document.querySelector('.bar-top');
const pictureWindow = document.querySelector('.picture-window');
const picture = document.querySelector('.picture');
const barBottom = document.querySelector('.bar-bottom');
const spaceBelow = document.querySelector('.space-below');
const barPercent = 0.3;  // percent of image to cover.
let pictureHeight;
let barHeight;

function initSizes() {
	pictureHeight = Math.ceil(window.innerHeight / (1 + barPercent));
	barHeight = Math.ceil(barPercent * pictureHeight);

	pictureWindow.style.height = `${pictureHeight}px`;
	picture.style.height = `${pictureHeight}px`;

	barTop.style.height = `${barHeight}px`;
	barTop.style.width = `${picture.width}px`;

	barBottom.style.height = `${barHeight}px`;
	barBottom.style.width = `${picture.width}px`;
}

function updateBottomBar() {
	// need to be able to handle if the entire picture and space below is in view.
	// if space-below is not in view, start figure out when it comes into view and move the bottom bar according to how much of space-below is showing.
	let barTopMargin = pictureHeight - barHeight;
	windowPositionBottom = window.scrollY + window.innerHeight;
	if (windowPositionBottom > spaceBelow.offsetTop) { //&& windowPositionBottom < spaceBelow.offsetTop + barHeight - 1) {
		barBottom.style.marginTop = `${barTopMargin + (windowPositionBottom - (picture.offsetTop + picture.offsetHeight))}px`
	} else if (windowPositionBottom > (spaceBelow.offsetTop + barHeight)) {
		barBottom.style.marginTop = `${picture.offsetHeight}px`;
	}

}

initSizes();

// window.addEventListener('scroll', updateBottomBar);

// make sure the bars are resized when the window is resized.
window.onresize = initSizes;
// set scrollTo to the top of the page so it will go there when the page is refreshed.
window.onbeforeunload = () => window.scrollTo(0,0);