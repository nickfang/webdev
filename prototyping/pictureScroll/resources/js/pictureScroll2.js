const debugBorders = false;
let border;

const barPercent = 0.4;  // percent of image to cover.
const bar =  document.querySelectorAll('.bar');
const pictureWindow = document.querySelector('.picture-window');
const picture = document.querySelector('.picture');
const barBottom = document.querySelector('.bar-bottom');
const spaceBelow = document.querySelector('.space-below');
const text = document.querySelectorAll('.text');
const textBottom = document.querySelector('.bar-bottom-text');

let pictureHeight;
let barHeight;

function initSizes() {
	pictureHeight = Math.ceil(window.innerHeight / (1 + barPercent));
	barHeight = Math.ceil(barPercent * pictureHeight);

	picture.style.height = `${pictureHeight}px`;
	// TODO:  figure out why the bar width is sometimes 0.
	let pictureWidth = picture.width;
	// while (pictureWidth === 0) {
	// 	setTimeout( () => { pictureWidth = picture.width; }, 1000);
	// }
	console.log(pictureWidth);
	// center the image on the page
	pictureWindow.style.width = `${pictureWidth}px`;

	// set the size of the top and bottom bar
	for (let i = 0; i < bar.length; i++) {
		bar[i].style.height = `${barHeight}px`;
		bar[i].style.width = `${pictureWidth}px`;
	}

	// set the position of the bottom bar
	barBottom.style.top = `${pictureHeight - barHeight}px`;

	// set the size of the font depending on the size of the bar.
	// 6 is based off of what looks good with the current text.
	for (let i = 0; i < text.length; i++) {
		text[i].style.fontSize = `${Math.floor(barHeight / 6)}px`;
	}
	// hide the text shadow
	setTextBottomShadow(0);

	// space for the bottom bar to scroll into.
	spaceBelow.style.height = `${barHeight}px`;
}

function updateBottomBar() {
	// if the window is scrolled determind the position of the bottom Bar and update text.
	const barTopOriginal = pictureHeight - barHeight;
	windowPositionBottom = window.scrollY + window.innerHeight;
	if (windowPositionBottom > spaceBelow.offsetTop && windowPositionBottom < spaceBelow.offsetTop + barHeight) {
		// move bottom bar while scrolling
		barBottom.style.top = `${windowPositionBottom - spaceBelow.offsetTop + barTopOriginal}px`;
		// fade text in and out while scrolling.  Fade in after halfway through moving the bottom bar.
		if (windowPositionBottom > spaceBelow.offsetTop + (barHeight / 2)) {
			// simplified equation for going from 0 at half bar height and 1 at full bar height
			opacity = (2 * (windowPositionBottom - spaceBelow.offsetTop) / barHeight) - 1;
			// I didn't like how the fade in looked since you saw the shadow first.  Made the text fade in twice as fast.
			textBottom.style.color = `rgba(255,255,255,${opacity * 2})`;
			setTextBottomShadow(opacity);
		} else {
			// if we're not fading in the text, make sure it's completely faded out.
			textBottom.style.color = `rgba(255,255,255,0)`;
			setTextBottomShadow(0);
		}
	} else if (window.scrollY == 0) {
		// if we're scrolled to the top of the page, make sure the bar is in the right location and the text is completely transparent
		// if we don't do this, the bottom bar might not move all the way back to the original location.
		barBottom.style.top = `${barTopOriginal}px`;
		textBottom.style.color = `rgba(255,255,255,0)`;
		setTextBottomShadow(0);
	}
}

function setTextBottomShadow(opacity) {
	textBottom.style.textShadow = `2px 2px 0 rgba(0,0,0,${opacity}), -2px 2px 0 rgba(0,0,0,${opacity}), 2px -2px 0 rgba(0,0,0,${opacity}), -2px -2px 0 rgba(0,0,0,${opacity})`
}

debugBorders ? border = "1px solid green" : border = "none";
document.documentElement.style.setProperty(`--${"debug-borders"}`, border);

initSizes();

window.addEventListener('scroll', updateBottomBar);

// make sure the bars are resized when the window is resized.
window.onresize = initSizes;
// set scrollTo to the top of the page so it will go there when the page is refreshed.
window.onbeforeunload = () => window.scrollTo(0,0);