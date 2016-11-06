const $elem = {
	root: $('#lvSelector'),
	select: $('#lvSelect'),
	dropdown: $('#lvDropdown')
}

let level = 1;
let title = '';


module.exports = {
	init: () => {
		$elem.select.on('click', () => {
			if($elem.root.hasClass('open')) {
				$elem.root.removeClass('open');
			} else {
				$elem.root.addClass('open');
			}
		});
		$elem.dropdown.children().on('click', function() {
			const text = $(this).text();
			level = $(this).data('level');
			$elem.select.children().text(text);
			$elem.root.removeClass('open');
			title = text;
		});
	},
	getTitle: () => {
		return title;
	},
	getLevel: () => {
		return level;
	}
}