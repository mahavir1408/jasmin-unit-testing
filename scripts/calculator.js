function Calculator() {
	this.total = 0;
}

//Add method
Calculator.prototype.add = function (number) {
	return this.total +=  number;
};

//Subtract method
Calculator.prototype.subtract = function (number) {
	return this.total -= number;
};

// Multiply method
Calculator.prototype.multiply = function (number) {
	return this.total *= number;

};

//Divide method
Calculator.prototype.divide = function (number) {
	// Check if the number is zero then we throw an error
	if (number === 0) {
		throw new Error('Can not divide by zero');
	}

	return this.total  /= number;
};

// add a getter on the calculator
Object.defineProperty(Calculator.prototype, 'version', {
	get: function () {
		return fetch('https://gist.githubusercontent.com/juanlizarazo/4b2d229ba483ca13b1a6d7bf3079dc8b/raw/228ac05e04118037be02c38d9b86945c1356a2e2/version.json')
			.then(function (result) {
				return result.json()
			})
			.then(function (json) {
				return json.version;
			})
	},
	enumerable: true,
	configurable: true
});