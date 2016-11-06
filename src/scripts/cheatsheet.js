$('#openCS').on('click', function() {
	const $cheatsheet = $('#cheatsheet');
	if($(this).hasClass('open')) {
		$(this).removeClass('open');
		$cheatsheet.removeClass('open');
	} else {
		$(this).addClass('open');
		$cheatsheet.addClass('open');
	}
});