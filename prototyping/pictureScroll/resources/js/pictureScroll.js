/*
	With google chrome half the width of a 2560
	barTop.offsetTop = 9
	barTop.offsetHeight = 374
	picture.offsetTop = 383
	picture.offsetHeight = 1247
	spaceBelow.offsetTop = 1630
	spaceBelow.offsetHeight = 374

*/

const barTop =  document.querySelector('.bar-top');
const picture = document.querySelector('.main-picture');
const barBottom = document.querySelector('.bar-bottom');
const spaceBelow = document.querySelector('.space-below');


function setBarSizes() {
	let barHeight = Math.ceil(.3 * picture.clientHeight);
	let barTopMargin = picture.clientHeight - barHeight;
	barTop.style.height = `${barHeight}px`;
	barBottom.style.height = `${barHeight}px`;
	barBottom.style.marginTop = `${barTopMargin}px`;
	spaceBelow.style.height = `${barHeight}px`;
}

function updateBottomBar() {
	// need to be able to handle if the entire picture and space below is in view.
	// if space-below is not in view, start figure out when it comes into view and move the bottom bar according to how much of space-below is showing.
	let barHeight = Math.ceil(.3 * picture.clientHeight);
	let barTopMargin = picture.clientHeight - barHeight;
	windowPositionBottom = window.scrollY + window.innerHeight;
	if (windowPositionBottom > spaceBelow.offsetTop && windowPositionBottom < spaceBelow.offsetTop + barHeight) {
		barBottom.style.marginTop = `${barTopMargin + (windowPositionBottom - (picture.offsetTop + picture.offsetHeight))}px`
	} else if (windowPositionBottom > (spaceBelow.offsetTop + barHeight)) {
		barBottom.style.marginTop = `${picture.offsetHeight}px`;
	}

}

setBarSizes();

window.addEventListener('scroll', updateBottomBar);

window.onresize = setBarSizes;  // make sure the bars are resized when the window is resized.
window.onbeforeunload = () => window.scrollTo(0,0);  // set scrollTo to the top of the page so it will go there when the page is refreshed.