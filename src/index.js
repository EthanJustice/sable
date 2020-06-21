class Sable {
	constructor(element, config, options) {
		this.observer = new MutationObserver(this.register);
		this.observer.observe(element, config);

		this.options = Object.assign({
			// defaults
		}, options);
	};

	register(data, observer) {
		console.log(data)
	}
}