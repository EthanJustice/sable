let sable = new Sable();

sable.start(document.body, {
	attributes: true,
	attributeOldValue: true,
	characterData: true,
	characterDataOldValue: true,
	childList: true,
	subtree: true,
});