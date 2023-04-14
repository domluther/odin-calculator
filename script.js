// Store calculator state/model centrally. Ease of access
const calculator = {};

const calculatorEle = document.querySelector(".calculator");
const buttonsContainer = document.querySelector(".buttons");
const displayEle = document.querySelector(".display");

// Basic operations
const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

// Call the appropriate function depending on operator passed in.
// If this were in an object, could use computed member access to make this cleaner.
const operate = (num1, operator, num2) => {
  num1 = Number(num1);
  num2 = Number(num2);
  if (operator === "add") return add(num1, num2);
  if (operator === "subtract") return subtract(num1, num2);
  if (operator === "multiply") return multiply(num1, num2);
  if (operator === "divide") return divide(num1, num2);
  return "Operator not recognised";
};

// Use later to programmatically generate the calcluator instead of hardcoding it
const generateCalculator = function () {};

buttonsContainer.addEventListener("click", (e) => {
  btn = e.target.closest(".button");
  if (!btn) return;

  // A button has been pressed - if it's a number, append the value to the displayed value
  const dataset = btn.dataset;
  if (dataset.function === "num") {
    console.log(btn);
    updateDisplayValue(btn.textContent);
    updateDisplay();
    return;
  }
  // clear button pressed
  if (dataset.function === "clear") {
    clearDisplay();
    updateDisplay();
  }

  if (dataset.function === "allClear") {
    resetCalcuator();
    updateDisplay();
  }

  // an operator pressed
  if (btn.classList.contains("operator")) {
    console.log(dataset.function);
    // Store the first number
    calculator.num1 = calculator.displayValue;
    clearDisplay();
    calculator.operator = dataset.function;
  }

  if (btn.classList.contains("equals")) {
    console.log("hmm");
    calculator.num2 = calculator.displayValue;
    // need to
    setDisplayValue(
      operate(calculator.num1, calculator.operator, calculator.num2)
    );
    updateDisplay();
  }
});

const setDisplayValue = (num) => {
  calculator.displayValue = num;
};
const updateDisplayValue = (num) => {
  calculator.displayValue =
    calculator.displayValue === "0" ? num : (calculator.displayValue += num);
};

const updateDisplay = () => {
  displayEle.textContent = calculator.displayValue;
};

const clearDisplay = () => {
  calculator.displayValue = "0";
};

const init = () => {
  generateCalculator();
  resetCalcuator();
  updateDisplay();
};

const resetCalcuator = () => {
  calculator.num1 = null;
  calculator.num2 = null;
  calculator.operator = null;
  calculator.result = null;
  calculator.displayValue = "0";
  calculator.firstNum = false;
};
