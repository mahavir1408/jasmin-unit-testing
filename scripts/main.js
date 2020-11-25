function calculate(inputValue) {
	const expression = /\+|\-|\*|\//;
	// using the operators to split the string
	const numbers = inputValue.split(expression);
	//debugger;

	// Use parseInt to convert the strings to numbers
	const numberA = parseInt(numbers[0]);

	const numberB = parseInt(numbers[1]);

	// Operator is the match in the expression
	const operation = inputValue.match(expression);
	//debugger;

	if (Number.isNaN(numberA) ||Number.isNaN(numberB) ||operation === null) {
		updateResult('Expression not recognized.');
		return;
	}

	const calculator = new Calculator();
	calculator.add(numberA);

	// Use let as the result will change depending on our operations
	let result;
	switch(operation[0]) {
		case '+':
			result = calculator.add(numberB);
			break;
		case '-':
			result = calculator.subtract(numberB);
			break;
		case '*':
			result = calculator.multiply(numberB);
			break;
		case '/':
			result = calculator.divide(numberB);
			break;
	}
	//debugger;

	updateResult(result);
}

function updateResult(result) {
	const element = document.getElementById('result');

	if (element) {
		element.innerText = result;
	}
}

function showVersion () {
	const calculator = new Calculator();

	const element = document.getElementById('version');

	calculator.version
		.then(function (version) {
			element.innerText = version;
		});
}