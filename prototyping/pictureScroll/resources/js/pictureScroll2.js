const debugBorders = false;
let border;

const barTop =  document.querySelector('.bar-top');
const pictureWindow = document.querySelector('.picture-window');
const picture = document.querySelector('.picture');
const barBottom = document.querySelector('.bar-bottom');
const spaceBelow = document.querySelector('.space-below');
const text = document.querySelector('.bar-bottom-text');
const barPercent = 0.3;  // percent of image to cover.
let pictureHeight;
let barHeight;

function initSizes() {
	pictureHeight = Math.ceil(window.innerHeight / (1 + barPercent));
	barHeight = Math.ceil(barPercent * pictureHeight);

	picture.style.height = `${pictureHeight}px`;
	pictureWindow.style.height = `${pictureHeight}px`;
	pictureWindow.style.width = `${picture.width}px`;

	// set the size of the top bar
	barTop.style.height = `${barHeight}px`;
	barTop.style.width = `${picture.width}px`;

	// set the size and position of the bottom bar
	barBottom.style.height = `${barHeight}px`;
	barBottom.style.width = `${picture.width}px`;
	barBottom.style.top = `${pictureHeight - barHeight}px`;

	// space for the bottom bar to scroll into.
	spaceBelow.style.height = `${barHeight}px`;

}

function updateBottomBar() {
	// if the window is scrolled determind the position of the bottom Bar and update text.
	let barTopOriginal = pictureHeight - barHeight;
	windowPositionBottom = window.scrollY + window.innerHeight;
	if (windowPositionBottom > spaceBelow.offsetTop && windowPositionBottom < spaceBelow.offsetTop + barHeight) {
		barBottom.style.top = `${windowPositionBottom - spaceBelow.offsetTop + barTopOriginal}px`;
		text.style.color = `rgba(255,255,255,${(windowPositionBottom-spaceBelow.offsetTop)/barHeight})`;
	} else if (windowPositionBottom > spaceBelow.offsetTop + barHeight) {
		barBottom.style.top = `${pictureHeight}px`;
		text.style.color = `rgba(255,255,255,1)`;
	} else if (window.scrollY == 0) {
		barBottom.style.top = `${barTopOriginal}px`;
		text.style.color = `rgba(255,255,255,0)`;
	}
}


debugBorders ? border = "1px solid green" : border = "none";
document.documentElement.style.setProperty(`--${"debug-borders"}`, border);
initSizes();

window.addEventListener('scroll', updateBottomBar);

// make sure the bars are resized when the window is resized.
window.onresize = initSizes;
// set scrollTo to the top of the page so it will go there when the page is refreshed.
window.onbeforeunload = () => window.scrollTo(0,0);