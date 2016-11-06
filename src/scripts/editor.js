const compiler = require('./compiler');
const u = require('./utils');

const $elem = {
	genCode: $('#genCode')
}

const editor = () => {
	const val = u.$elem.editor.val();
	const code = compiler.compile(val);
	console.log(code)
	u.$elem.result.text(code);
	$elem.genCode.attr('data-clipboard-text', code);
	u.highlight.update();
}

module.exports = {
	update: editor,
	init: () => {
		editor();
		u.$elem.editor.on('keyup', function(e) {
			editor();
		});
	}
}