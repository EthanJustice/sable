let sable = new Sable();

sable.start(document.body.querySelector('.tests'), {
	attributes: true,
	attributeOldValue: true,
	characterData: true,
	characterDataOldValue: true,
	childList: true,
	subtree: true,
});

window.addEventListener('sable-change', data => {
	data = data.detail;

	let change;
	if (data.change == 'changed-attribute') {
		change = `Changed attribute: [${data.attribute}=${data.old || '""'}] to [${data.attribute}=${data.new || '""'}]`
	} else if (data.change == 'added-node') { change = `Added node ${data.children}` }
	else { change = `Removed node ${data.children}` }

	let row = buildElement('tr', '', { className: `sable-interface ${data.change}` });

	let changeType = buildElement('td', `${change}`);
	row.appendChild(changeType);

	let target = buildElement('td', `${String(data.target.tagName).toLocaleLowerCase()}.${data.uniqueId}`);
	row.appendChild(target);

	document.body.querySelector('.stream tbody').appendChild(row);
});