// Store calculator state/model centrally. Ease of access
const calculator = {
  maxDP: 6,
  operatorLookup: {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
  },
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
    handleDigit(btn.textContent);
    return;
  }

  if (btn.classList.contains("operator")) {
    handleOperator(dataset.function);
    return;
  }

  if (btn.classList.contains("equals")) {
    // Calculation 'finished' so clear operator
    equalsPressed();
    calculator.operator = null;
    return;
  }

  if (dataset.function === "allClear") {
    resetCalcuator();
    updateDisplay();
    return;
  }

  if (dataset.function === "plusMinus") {
    calculator.displayValue =
      calculator.displayValue.charAt(0) === "-"
        ? calculator.displayValue.slice(1)
        : "-" + calculator.displayValue;
    updateDisplay();
    return;
  }

  // clear button pressed
  if (dataset.function === "clear") {
    clearDisplay();
    updateDisplay();
    return;
  }
});

// used to display the answer
const displaySolution = (num) => {
  // Set to max of 6 dp, convert to a number to chop trailing 0s and then back to a string as that's how I'm storing
  calculator.displayValue = String(+num.toFixed(calculator.maxDP));
};

const handleDigit = (digit) => {
  updateDisplayValue(digit);
  updateDisplay();
};

const handleOperator = (operator) => {
  if (calculator.operator) equalsPressed();
  // Store the first number
  calculator.num1 = calculator.displayValue;
  clearDisplay();
  calculator.operator = operator;
};

const equalsPressed = () => {
  calculator.num2 = calculator.displayValue;
  const solution = operate(
    calculator.num1,
    calculator.operator,
    calculator.num2
  );
  if (Number.isFinite(solution)) displaySolution(solution);
  else calculator.displayValue = "Not a number";
  updateDisplay();
};

// used when typing in a number
const updateDisplayValue = (num) => {
  // Max of 1 . in a number
  if (num === ".") {
    calculator.displayValue = calculator.displayValue.includes(".")
      ? calculator.displayValue
      : (calculator.displayValue += num);
    return;
  }
  // fixes displayValue being empty and numbers not starting with a 0 (unless a decimal)
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

window.addEventListener("keypress", function (e) {
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operators = ["/", "*", "-", "+"];

  e.preventDefault();
  if (digits.includes(e.key)) {
    handleDigit(e.key);
    return;
  }

  if (operators.includes(e.key)) {
    handleOperator(calculator.operatorLookup[e.key]);
    return;
  }

  if (e.key === "Enter") {
    equalsPressed();
    calculator.operator = null;
    return;
  }

  if (e.key === "c") {
    clearDisplay();
    updateDisplay();
    return;
  }
});

init();
