const init = require('./init');
const level = require('./level');
const editor = require('./editor');

$(function() {
	/*
	 * 初期化
	 */
	// エディタの初期化・設定
	init.editor();
	// ショートカットキー設定
	init.shortcuts();
	// チートシート初期化
	init.cheatsheet();
	// エディタークリアボタンを初期化
	init.clear();
	// Clipboard.jsコールバックの初期化
	init.clipboard();
	// 課題レベルメニューを初期化
	level.init();
	// エディタを初期化・起動
	editor.init();
});