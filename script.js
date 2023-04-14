// Store calculator state/model centrally. Ease of access
const calculator = {
  num1: 0,
  num2: 0,
  operator: null,
  result: 0,
  displayValue: "0",
};

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
  if (dataset.function === "clear") {
    clearDisplay();
  }
});

const updateDisplayValue = (num) => {
  calculator.displayValue =
    calculator.displayValue === "0" ? num : (calculator.displayValue += num);
};

const updateDisplay = (num) => {
  displayEle.textContent = calculator.displayValue;
};

const clearDisplay = () => {
  calculator.displayValue = "0";
  updateDisplay();
};

const init = function () {
  generateCalculator();
  updateDisplay();
};
