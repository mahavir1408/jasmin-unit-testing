describe('main.js', function () {
	describe('calculate()', function () {
		it('validates expression when  the first number is invalid', function () {
			spyOn(window, 'updateResult').and.stub();

			calculate('a' + 3);

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized.');
			expect(window.updateResult).toHaveBeenCalledTimes(1);
		});

		it('validates expression when the second is invalid', function () {
			spyOn(window, 'updateResult'); // and.stub() is the default, and can be omitted

			calculate('a+ 3' );

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized.');
			expect(window.updateResult).toHaveBeenCalledTimes(1);
		});

		it('validates expression when operation is invalid', function () {
			spyOn(window, 'updateResult'); // and.stub() is the default, and can be omitted

			calculate('3_4');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized.');
			expect(window.updateResult).toHaveBeenCalledTimes(1);
		});

		it('calls add', function () {
			const spy = spyOn(Calculator.prototype, 'add');

			calculate('3+4');

			expect(spy).toHaveBeenCalledTimes(2);
			expect(spy).toHaveBeenCalledWith(3);
			expect(spy).toHaveBeenCalledWith(4);
		});

		it('calls subtract', function () {
			const spy = spyOn(Calculator.prototype, 'subtract');

			calculate('3-7');

			expect(spy).toHaveBeenCalled();
			expect(spy).toHaveBeenCalledWith(7);
		});

		it('calls multiply', function () {
			const spy = spyOn(Calculator.prototype, 'multiply');

			calculate('3*8');

			expect(spy).toHaveBeenCalled();
			expect(spy).not.toHaveBeenCalledWith(3);
			expect(spy).toHaveBeenCalledWith(8);
		});

		it('calls divide', function () {
			const spy = spyOn(Calculator.prototype, 'divide');

			calculate('3/2');

			expect(spy).toHaveBeenCalled();
			expect(spy).not.toHaveBeenCalledWith(3);
			expect(spy).toHaveBeenCalledWith(2);
		});

		// callThrough
		it('calls updateResult (example using and callThrough', function () {
			spyOn(window, 'updateResult');
			spyOn(Calculator.prototype, 'multiply').and.callThrough();

			calculate('5*5');
			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith(25);

		});

		// callFake
		it('calls updateResult (example using and callFake', function () {
			spyOn(window, 'updateResult');
			spyOn(Calculator.prototype, 'multiply').and.callFake(function (number) {
				return 'it works';
			});

			calculate('5*5');
			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('it works');

		});

		// return Value
		it('calls updateResult (example using and.returnValue', function () {
			spyOn(window, 'updateResult');
			spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever [multiply] return');


			calculate('5*5');
			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('whatever [multiply] return');

		});

		// returnValues
		it('calls updateResult (example using and.returnValues', function () {
			spyOn(window, 'updateResult');
			spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever [add] return');


			calculate('5+5');
			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('whatever [add] return');

		});

		// throwError
		it('does note handle errors', function () {
			spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

			expect(function () {
				calculate('5*5')
			}).toThrowError('some error')
		});
	});

	describe('updateResult()',  () => {
		let element;
		beforeAll( () => {
			// execute ONCE before all specs are executed
			element = document.createElement('div');
			element.setAttribute('id', 'result');
			document.body.appendChild(element);
			/*element = element;*/
		});
		// Clean up for afterAll
		afterAll( () =>{
			// Execute ONCE after all specs are executed
			document.body.removeChild(element);
		});

		it('adds result to DOM element', function () {

			updateResult('5');

			expect(element.innerText).toBe('5');
		});
	});

	describe('showVersion', function () {
		it('it calls calculator.version', function () {
			spyOn(document, 'getElementById').and.returnValue({
				innerText: null
			});

			const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
				Promise.resolve()
			);

			showVersion();

			expect(spy).toHaveBeenCalled();
		});
	});
});

