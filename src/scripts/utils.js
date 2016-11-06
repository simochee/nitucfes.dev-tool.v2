const hljs = require('highlight.js');

module.exports = {
	$elem: {
		editor: $('#editor'),
		result: $('#result')
	},
	highlight: {
		update: () => {
			hljs.highlightBlock($('#result')[0])
		}
	}
}