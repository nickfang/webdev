const barTop = document.querySelector('.top-bar');
const picture = document.querySelector('.main-picture');

function scrollBars() {
	if (window.scrollY < picture.offsetTop) {
		console.log(window.scrollY + " " + picture.offsetTop);
		// document.body.

	}
}

window.addEventListener('scroll', scrollBars);