// Store calculator state/model centrally. Ease of access
const calculator = {
  maxDP: 6,
  maxLength: 12,
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

// core operations
const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

// Call the appropriate function depending on operator passed in.
const operate = (num1, operator, num2) => {
  // values are stored as strings to make appending easier - they need to be numbers to calculate
  if (operator === "add") return add(+num1, +num2);
  if (operator === "subtract") return subtract(+num1, +num2);
  if (operator === "multiply") return multiply(+num1, +num2);
  if (operator === "divide") return divide(+num1, +num2);
  return "Operator not recognised";
};

const displaySolution = (num) => {
  // Max dp depends on how long the number is
  let maxDP = Math.min(
    calculator.maxDP,
    calculator.maxLength - calculator.displayValue.length
  );
  // On calculation sets max decimal places
  // Convert to a number -> chop trailing 0s and then back to a string as that's how I'm storing
  let tempValue = String(+num.toFixed(maxDP));
  // Check for overflow
  calculator.displayValue =
    tempValue.length > calculator.maxLength ? "overflow" : tempValue;
};

const handleDigit = (digit) => {
  updateDisplayValue(digit);
  showValue();
};

const handleOperator = (operator) => {
  // Pressing an operator when there's already one, needs to calculate and then continue
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
  showValue();
};

// used when digits are being added
const updateDisplayValue = (num) => {
  if (calculator.displayValue.length >= calculator.maxLength) return;

  // Max of 1 . in a number
  if (num === ".") {
    calculator.displayValue = calculator.displayValue.includes(".")
      ? calculator.displayValue
      : (calculator.displayValue += num);
    return;
  }
  // can't enter a 0 if there's already one and numbers not starting with a 0 (unless a decimal)
  calculator.displayValue =
    calculator.displayValue === "0" ? num : (calculator.displayValue += num);
};

const showValue = () => {
  displayEle.textContent = calculator.displayValue;
};

const clearDisplay = () => {
  calculator.displayValue = "0";
};

const init = () => {
  resetCalcuator();
  showValue();
};

const resetCalcuator = () => {
  calculator.num1 = null;
  calculator.num2 = null;
  calculator.operator = null;
  calculator.result = null;
  calculator.displayValue = "0";
  calculator.firstNum = false;
};

/* EVENT LISTENERS */

buttonsContainer.addEventListener("click", (e) => {
  btn = e.target.closest(".button");
  if (!btn) return;

  // dataset holds key button information
  const dataset = btn.dataset;

  if (dataset.function === "num") {
    console.log(btn.style);
    handleDigit(btn.textContent);
    return;
  }

  if (dataset.function === "operator") {
    handleOperator(dataset.operator);
    return;
  }

  if (dataset.function === "equals") {
    equalsPressed();
    // needs to clear operator as new numbers needed
    calculator.operator = null;
    return;
  }

  if (dataset.function === "allClear") {
    resetCalcuator();
    showValue();
    return;
  }

  if (dataset.function === "plusMinus") {
    calculator.displayValue =
      calculator.displayValue.charAt(0) === "-"
        ? calculator.displayValue.slice(1)
        : "-" + calculator.displayValue;
    showValue();
    return;
  }

  if (dataset.function === "clear") {
    clearDisplay();
    showValue();
    return;
  }
});

window.addEventListener("keydown", function (e) {
  // Doesn't have a button for +/-
  //
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
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

  if (e.key === "Backspace") {
    clearDisplay();
    showValue();
    return;
  }

  if (e.key === "Escape") {
    resetCalcuator();
    showValue();
    return;
  }
});

init();
