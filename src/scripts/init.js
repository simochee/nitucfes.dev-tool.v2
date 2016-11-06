const Clipboard = require('clipboard');
const clipboard = new Clipboard('#genCode');
const u = require('./utils');
const editor = require('./editor');

module.exports = {
	editor: () => {
		u.$elem.editor.focus();
		u.$elem.editor.on('focusout', function(e) {
			u.$elem.editor.focus();
		});
	},
	shortcuts: () => {
		u.$elem.editor.on('keydown', function(e) {
			// Tab入力の有効化
			if(e.keyCode === 9) {
				e.preventDefault();
				const pos = this.selectionStart;
				const val = $(this).val();
				// Tabの挿入
				$(this).val(val.substr(0, pos) + `\t` + val.substr(pos, val.length));
				// 挿入後のカーソル位置指定
				this.setSelectionRange(pos + 1, pos + 1);
			}
		});
		$(window).on('keydown', function(e) {
			if(e.ctrlKey) {
				if(e.shiftKey) {
					if(e.keyCode === 67) {
						e.preventDefault();
						$('#genCode').click();
					}
				}
				if(e.keyCode === 83) {
					e.preventDefault();
					$('#genCode').click();
				}
			}
			if(e.altKey) {
				if(e.keyCode === 87) {
					e.preventDefault();
					$('#editor').val('').focus();
				}
			}
		});
	},
	cheatsheet: () => {
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
	},
	clear: () => {
		$('#clear').on('click', function(e) {
			u.$elem.editor.val('').focus();
			editor.update();
		});
	}
}