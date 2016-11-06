const methods = {
	'car.fwd': 'motor_fwd();',
	'car.rev': 'motor_rev();',
	'car.stop': `motor_stop();`,
	'car.left': 'motor_lt();',
	'car.right': 'motor_rt();'
}

const tabs = (num) => {
	let result = '';
	for(let i = 0; i <= num; i++) {
		result += '\t';
	}
	return result;
}

const base = (type, condition, indent) => {
	const tab = tabs(indent);
	let result = `${tab}%TYPE% ( %CONDITION% ) {\n%ACTION%\n${tab}}\n`;
	if(type === 'if') {
		result = result.replace(/%TYPE%/g, 'if');
	} else if(type === 'elseif') {
		result = result.replace(/%TYPE%/g, 'else if');
	}
	const sensor = condition.match(/^(.+)==/)[1];
	const color = condition.match(/==(.+)$/)[1];
	let adPos;
	if(sensor === 'center') {
		adPos = 0;
	} else if(sensor === 'left') {
		adPos = 4;
	} else if(sensor === 'right') {
		adPos = 5;
	}
	let adType;
	if(color === 'black') {
		adType = 1;
	} else if(color === 'white') {
		adType = 0;
	}
	result = result.replace(/%CONDITION%/g, `onLine(${adPos}) == ${adType}`);
	return result;
}

module.exports = {
	compile: (code) => {
		const tmp = `#include <h8/reg3067.h>\n#include <mes2.h>\n\n#include "ad_conv.h"\n#include "motor.h"\n#include "led.h"\n\nvoid motor_drive() {\n%MAIN%}`;
		try {
			if(code === '') {
				return tmp.replace(/%MAIN%/g, '\t/* Source code here. */\n');
			}
			let source = '';
			const _if = code.match(/((if|elseif)\(.[^\)]*\)|else)/g);
			const _action = code.match(/({.[^}]*}|{})/g);
			_if.forEach((item, i) => {
				const type = item.match(/^.*\(/g);
				const condition = item.match(/\(.*\)/g);
				if(type !== null && condition !== null) {
					const t = type[0].slice(0, -1);
					const c = condition[0].slice(1, -1);
					const a = _action[i].slice(1, -1).split(';');
					source += `${base(t, c, 0)}`;
					let actions = '';
					for(let j = 0, len = a.length; j < len; j++) {
						if(!a[j]) continue;
						actions += `${tabs(1)}${methods[a[j]]}\n`;
					}
					actions = actions.replace(/\n$/g, '');
					source = source.replace(/%ACTION%/g, actions);
				} else {
					const a = _action[i].slice(1, -1).split(';');
					let actions = '';
					for(let j = 0, len = a.length; j < len; j++) {
						if(!a[j]) continue;
						actions += `${tabs(1)}${methods[a[j]]}\n`;
					}
					source += `\telse {\n${actions}\t}\n`;
				}
			});
			return tmp.replace(/%MAIN%/g, source);
		} catch (e) {
			return tmp.replace(/%MAIN%/g, `\t/* Error: Compile failure. */\n`);
		}
	}
}