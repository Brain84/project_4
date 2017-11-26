//open nav list
(function(){
	'use strict';
	$(function(){
		$('.js-hamburger').on('click', function() {
			$('.header-nav-list').toggleClass('is-open-menu');
		});

	});
})();
