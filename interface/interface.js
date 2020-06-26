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

	document.body.querySelector('.stream').appendChild(buildElement('p', `${change} ---------- ${String(data.target.tagName).toLocaleLowerCase()}.${data.uniqueId}`, { className: `sable-interface ${data.change}` }));
});