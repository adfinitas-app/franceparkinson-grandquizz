
$(document).ready(function() {
	moveScrollNext();
	moveScrollQuestion();

});


function moveScrollNext() {
	$('.bt-next').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		var sectionName = $(this).attr('href');	
		var sectionPosition = $(sectionName).offset();
		$('html, body').animate({scrollTop: (sectionPosition.top + 1)}, 700);
	});
}

function moveScrollQuestion() {
	$('#main .bt').on('click', function(event) {
		var sectionName = $(this).attr('data-href');	
		var sectionPosition = $(sectionName).offset();
		$('html, body').animate({scrollTop: (sectionPosition.top + 1)}, 700);
	});
}
