// Not tests right now, just testing to make sure functionality works

setTimeout(() => {
	let p = buildElement('p', 'Generic Test');
	document.body.querySelector('.tests').appendChild(p);
	setTimeout(() => {
		p.id = 'test';
		p.dataset.test = 'test';
	}, 1000);

	setTimeout(() => {
		p.id = '';
	}, 1500);

	setTimeout(() => {
		p.id = '';
	}, 1750);

	setTimeout(() => {
		p.remove();
		setTimeout(() => sable.stop(), 1000);
		setTimeout(() => document.body.querySelector('.tests').appendChild(p), 3000);
	}, 2000);
}, 2000);

// utils
const buildElement = (type, text, attributes) => {
	let element = document.createElement(type);
	element.innerText = text || '';
	if (attributes) {
		Object.keys(attributes).forEach(item => {
			if (item.includes('data_')) { element.setAttribute(item.replace(new RegExp('_', 'g'), '-'), attributes[item]) }
			else { element[item] = attributes[item] }
		});
	}
	return element;
}