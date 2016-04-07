
$(document).ready(function() {
	moveScrollNext();
	moveScrollQuestion();
	moveScrollThanks();
});

function moveScrollNext() {
	$('.bt-next').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var sectionName = $(this).attr('href');	
		animateScroll(sectionName, 700);
	});
}

function moveScrollQuestion() {
	$('#main .bt').on('click', function(event) {
		var sectionName = $(this).attr('data-href');	
		animateScroll(sectionName, 700);
	});
}

function moveScrollThanks() {
	if ($('#main').hasClass('page-thanks')) {
		setTimeout(function(){
			animateScroll('#bottom', 3000);
		}, 2000);
	}
}

function animateScroll (_sectionName, _timer) {
	var sectionPosition = $(_sectionName).offset();
	$('html, body').animate({scrollTop: (sectionPosition.top + 1)}, _timer);
}

