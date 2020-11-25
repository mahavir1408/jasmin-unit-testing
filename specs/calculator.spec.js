describe("calculator.js", function () {
  // define a variable that is available throughout the suite.
  let calculator;
  let calculator2;
  describe("Calculator", function () {
    beforeEach(function () {
      // initialise the calculator variable.
      calculator = new Calculator();
      calculator2 = new Calculator();
    });

    afterEach(function () {});
    it("should initialize the total", function () {
      // initialize a new instance of the calculator

      // We expect the value to start at 0
      expect(calculator.total).toBe(0);
      expect(calculator.total).toBeFalsy();
    });

    // Truthy Falsy
    it("can be instantiated", function () {
      jasmine.addMatchers(customMatchers);

      expect(calculator).toBeCalculator();
      expect(calculator).toBeTruthy();
      expect(calculator2).toBeTruthy();
      expect(calculator).toEqual(calculator2);
      expect(calculator.constructor.name).toContain("Calc");
    });

    // not.toBe
    it("instantiates unique object", function () {
      expect(calculator).not.toBe(calculator2);
    });

    // not.toBeDefined toBeDefined
    it("has common operations", function () {
      expect(calculator.add).toBeDefined(); //not.toBeUndefined();
      expect(calculator.subtract).toBeDefined();
      expect(calculator.multiply).toBeDefined();
      expect(calculator.divide).toBeDefined();
    });

    //  toBeNull
    it("can overwrite total", function () {
      // Intentional absence of a value
      calculator.total = null;

      expect(calculator.total).toBeNull();
    });
    describe("add()", function () {
      it("should add number to total", function () {
        // create a new instance of the calculator
        // Perform an addition operation passing in 5
        calculator.add(5);
        // expect to be 5
        expect(calculator.total).toBe(5);
      });
      // toMatch
      it("returns total", function () {
        calculator.total = 50;

        expect(calculator.add(20)).toBe(70);
        expect(calculator.total).toMatch(/-?\d+/);
        expect(typeof calculator.total).toMatch("number");
        expect(calculator.total).toEqual(jasmine.anything());
      });
      describe("subtract", function () {
        it("should subtract number from total", function () {
          // setup up calculator and initialize to a value
          calculator.total = 20;
          // perform subtraction operation
          calculator.subtract(5);
          // expect to be 20 - 5 to be 15
          expect(calculator.total).toBe(15);
        });
      });
      describe("multiply", function () {
        it("should multiply number by total", function () {
          // Setup and initialize to a value
          calculator.total = 15;
          // perform a multiplication operation
          calculator.multiply(2);
          // expect 15 * 2 to be 30
          expect(calculator.total).toBe(30);
        });
        // toBeNaN
        it("does not handle NaN", function () {
          calculator.total = 20;
          calculator.multiply("a");

          expect(calculator.total).toBeNaN();
        });
        // toThrow toThrowError
        it("handles divide by zero", function () {
          expect(function () {
            calculator.divide(0);
          }).toThrow();
          expect(function () {
            calculator.divide(0);
          }).toThrowError(Error);
          expect(function () {
            calculator.divide(0);
          }).toThrowError(Error, "Can not divide by zero");
        });
      });

      describe("divide", function () {
        it("should divide number by total", function () {
          // Setup and initialize a value
          calculator.total = 30;
          // perform a division operation
          calculator.divide(5);
          // expect 30 / 5 to be 6
          expect(calculator.total).toBe(6);
        });
      });
    });
  });
});
