const hamburgerIcon = document.querySelector('.hamburger');
const navi = document.querySelector('.navbar');

//listen for click on hamburger menu
hamburgerIcon.addEventListener('click', () => {
	navi.classList.toggle('transform');
});

//hide navigation on scroll

var prevScrlPos = window.pageYOffset;
window.onscroll = function() {
	var currentScrlPos = window.pageYOffset;
	if (prevScrlPos > currentScrlPos) {
		document.getElementById('large-screen-nav').style.top = '0';
	} else {
		document.getElementById('large-screen-nav').style.top = '-100%';
	}
	prevScrlPos = currentScrlPos;
};
