
$(document).ready(function() {
	moveScroll();

});


function moveScroll() {
	$('.bt-next, #main .bt').on('click', function(event) {
		event.stopPropagation();
		event.preventDefault();

		var sectionName = $(this).attr('href');	
		var sectionPosition = $(sectionName).offset();
		$('html, body').animate({scrollTop: (sectionPosition.top + 1)}, 700);
	});
}

