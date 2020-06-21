class Sable {
	constructor(options) {
		const register = (data, observer) => {
			data.forEach(record => {
				let recordData = {
					change: false,
					uniqueId: this._unique(),
					target: record.target
				};

				if (record.addedNodes.length == 0 && record.removedNodes.length != 0) { recordData.change = 'removed-node' }
				else if (record.addedNodes.length != 0 && record.removedNodes.length == 0) { recordData.change = 'added-node' }

				this.events.push(recordData);

				return recordData;
			});
		}

		this.ids = [];

		this.observer = new MutationObserver(register);

		this.options = Object.assign({
			// defaults
		}, options);

		this.events = [];
	};

	start(element, config) {
		this.observer.observe(element, config);
	};

	_unique() {
		let id = Math.ceil(Math.random() * 9999999999);
		this.ids.push(id);
		return id;
	}
}