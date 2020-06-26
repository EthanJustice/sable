class Sable {
	constructor(options) {
		const register = (data, observer) => {
			data.forEach(record => {
				if (record.attributeName == 'data-sable-id') { return }
				let id = this.tracked.filter(item => item.element == record.target).map(item => item.id)[0] || this._unique();

				if (!this.tracked.some(item => item.id == id)) {
					this.tracked.push({ element: record.target, id: id });
					record.target.dataset.sableId = id;
				}

				let recordData = {
					change: false,
					new: '',
					old: '',
					attribute: '',
					uniqueId: id,
					target: record.target,
					children: ''
				};

				if (record.addedNodes.length == 0 && record.removedNodes.length != 0) {
					recordData.change = 'removed-node';
					record.removedNodes.forEach(node => {
						this.tracked.filter(item => item.id == node.dataset.sableId).forEach((item, index) => delete this.tracked[index])
						recordData.children += ` ${String(node.tagName).toLocaleLowerCase()}.${node.dataset.sableId}`
					});
				} else if (record.addedNodes.length != 0 && record.removedNodes.length == 0) {
					recordData.change = 'added-node';
					record.addedNodes.forEach(node => {
						let childId = this._unique()
						this.tracked.push({ element: node, id: childId });
						node.dataset.sableId = childId
						recordData.children += ` ${String(node.tagName).toLocaleLowerCase()}.${node.dataset.sableId}`
					});
				} else if (record.type == 'attributes') {
					recordData.change = 'changed-attribute';
					recordData.attribute = record.attributeName;
					recordData.old = record.oldValue;
					recordData.new = record.target[record.attributeName];
				}

				this.events.push(recordData);

				this._dispatch('sable-change', { detail: recordData }, window);

				return recordData;
			});
		}

		this.tracked = [];

		this.observer = new MutationObserver(register);
		this.latestConfig = {};

		this.options = Object.assign({
			// defaults
		}, options);

		this.events = [];
	};

	start(element, config) {
		this.latestConfig = {
			element: element,
			config: config
		};
		this.observer.observe(element, config);
	};

	stop() {
		this.observer.disconnect();
	}

	_unique() {
		let id = Math.ceil(Math.random() * 9999999999);
		return id;
	};

	_dispatch(event, data, location) {
		let customEvent = new CustomEvent(event, data);
		location.dispatchEvent(customEvent);
	};
}