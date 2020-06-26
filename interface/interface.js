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

	document.body.appendChild(buildElement('p', `${String(data.target.tagName).toLocaleLowerCase()}.${data.uniqueId}`, { className: `sable-interface ${data.change}` }));
});