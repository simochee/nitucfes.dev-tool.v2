const $root = $('#lvSelector');
const $select = $('#lvSelect');
const $dropdown = $('#lvDropdown');

let level = 1;

$select.on('click', () => {
	if($root.hasClass('open')) {
		$root.removeClass('open');
	} else {
		$root.addClass('open');
	}
});

$dropdown.children().on('click', function() {
	const text = $(this).text();
	level = $(this).data('level');
	$select.children().text(text);
	$root.removeClass('open');
});

module.exports = {
	getLevel: () => {
		return level;
	}
}