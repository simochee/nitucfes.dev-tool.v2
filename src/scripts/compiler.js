const level = require('./level');

const tmp = `#include <h8/reg3067.h>\n#include <mes2.h>\n\n#include "ad_conv.h"\n#include "motor.h"\n#include "led.h"\n\nvoid motor_drive() {\n%MAIN%}`;
const msg = [
	`\t/*   Compile error   */\n`,
	`\t/* Source code here. */\n`
]
const actions = {
	'car.fwd': 'motor_fwd();',
	'car.rev': 'motor_rev();',
	'car.stop': `motor_stop();`,
	'car.left': 'motor_lt();',
	'car.right': 'motor_rt();',
	'car.fwd.slow': 'motor_fwd_slow();',
	'car.rev.slow': 'motor_rev_slow();',
	'car.left.ra': 'motor_lt_ra();',
	'car.right.ra': 'motor_rt_ra();',
	'led.flash': 'led_flash()',
	'led.stop': 'led_stop()'
}

const tabs = (num) => {
	let result = '';
	for(let i = 0; i < num; i++) {
		result += '\t';
	}
	return result;
}

const makeCondition = (condition) => {
	const arr = condition.split(/&&/g);
	let result = [];
	arr.forEach((item, i) => {
		const sensor = item.match(/^(.+)==/)[1];
		const color = item.match(/==(.+)$/)[1];
		let ADpos, ADtype;
		// センサー位置を定義
		if(sensor === 'center') {
			ADpos = 0;
		} else if(sensor === 'left') {
			ADpos = 4;
		} else if(sensor === 'right') {
			ADpos = 5;
		}
		// センサーの色を定義
		if(color === 'black') {
			ADtype = 0;
		} else if(color === 'white') {
			ADtype = 1;
		}
		result.push(`isWhite(${ADpos}) == ${ADtype}`);
	});
	return result.join(' && ');
}

const makeAction = (action, tab = 2) => {
	let result = '';
	action.forEach((item) => {
		if(item) {
			result += `${tabs(tab)}${actions[item]}\n`
		}
	});
	return result.replace(/\n$/g, '');
}

const coder = (plain) => {
	const _if = plain.match(/(if|elseif)\(.[^\)]*\)|else/g);
	const _action = plain.match(/{.[^}]*}|{}/g);
	let result = '';
	_if.forEach((item_if, i_if) => {
		// 条件の種類・条件を抽出
		const type = item_if.match(/^(if|elseif|else)/g);
		const condition = item_if.match(/\((.+)\)$/g);
		let tmp = `\t%TYPE% ( %CONDITION% ) {\n%ACTION%\n\t}\n`;
		if( condition ) {
			// if or else if
			const t = type[0];
			const c = condition[0].slice(1, -1);
			const a = _action[i_if].slice(1, -1).split(';');
			if(t === 'if' && c === 'all') {
				tmp = `%ACTION%\n`;
				tmp = tmp.replace(/%ACTION%/g, makeAction(a, 1));
			} else {
				tmp = tmp.replace(/%TYPE%/g, t === 'elseif' ? 'else if' : t);
				tmp = tmp.replace(/%CONDITION%/g, makeCondition(c));
				tmp = tmp.replace(/%ACTION%/g, makeAction(a));
			}
			result += tmp;
		} else {
			const a = _action[i_if].slice(1, -1).split(';');
			let tmp = `\telse {\n%ACTION%\n\t}\n`;
			tmp = tmp.replace(/%ACTION%/g, makeAction(a));
			result += tmp;
		}
	});
	return result;
}

module.exports = {
	compile: (val) => {
		try {
			const plain = val.replace(/\/\/.*(\n|$)| |\n|\t/g, '');	
			// 入力がなかったら例外を投げる
			if(plain === '') throw 1;
			let code = coder(plain);
			return tmp.replace(/%MAIN%/g, code);
		} catch(id) {
			if(msg[id]) {
				return tmp.replace(/%MAIN%/g, msg[id]);
			} else {
				return tmp.replace(/%MAIN%/g, msg[0]);
			}
		}
	}
}