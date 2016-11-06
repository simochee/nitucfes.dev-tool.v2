const editor = require('./editor');
const cheatsheet = require('./cheatsheet');
const level = require('./level');
const hljs = require('highlight.js');
const Clipboard = require('clipboard');

const clipboard = new Clipboard('#genCode');

$(function() {
	$('#editor').focus();
	$('#editor').on('focusout', function(e) {
		$('#editor').focus();
	});
	$('#editor').on('keydown', function(e) {
		// Tabキー無効化＋Tab挿入
		if (e.keyCode === 9) {
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
	$('#clear').on('click', function(e) {
		$('#editor').val('').focus();
	});
	$('#editor').on('keyup', function(e) {
		const val = $(this).val();
		const plain = val.replace(/\/\/.*(\n|$)| |\n|\t/g, '');
		const code = editor.compile(plain);
		$('#result').text(code);
		$('#genCode').attr('data-clipboard-text', code);
		$('#result').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	});
});