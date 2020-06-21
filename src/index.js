class Sable {
	constructor(options) {
		this.observer = new MutationObserver(this.register);

		this.options = Object.assign({
			// defaults
		}, options);
	};

	start(element, config) {
		this.observer.observe(element, config);
	}

	register(data, observer) {
		data.forEach(record => console.log(record))
	}
}