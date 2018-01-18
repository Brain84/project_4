import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

//open nav list
$('.js-hamburger').on('click', function() {
	$('.header-nav-list').toggleClass('is-open-menu');
});
