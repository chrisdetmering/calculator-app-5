const numberDisplay = document.getElementById('number-display');
let currentValue = "0";
let previousValue = "0";
let currentOperator = "none";
numberDisplay.textContent = currentValue;

window.addEventListener('click', function (event) {

    if (isPressed('#clear', event)) {
        handleClearPress();
    }

    if (isPressed('.number', event)) {
        if (currentValue.length === 10) return;
        handleNumberPress(event)
    }

    if (isPressed('#decimal', event)) {
        handleDecimalPress();
    }

    if (isPressed('.operator', event)) {
        handleOperatorPress(event.target.value);
    }

    if (isPressed('#equals', event)) {
        calculate(currentOperator);
    }

    numberDisplay.textContent = currentValue;
})

//Helper Functions
function isPressed(type, event) {
    return event.target.matches(type);
}

function handleNumberPress(event) {
    if (currentOperator === "none" && previousValue === "0") {
        setFirstNumber(event);
    }

    if (currentOperator !== "none") {
        setSecondNumber(event);
    }
}


function setSecondNumber(event) {
    if (previousValue === "0") {
        previousValue = currentValue
        currentValue = event.target.value;
    }

    else {
        currentValue += event.target.value;
    }
}

function setFirstNumber(event) {
    if (currentValue === "0") {
        currentValue = event.target.value;
    } else {
        currentValue += event.target.value;
    }
}

function handleClearPress() {
    currentValue = "0";
    previousValue = "0";
    currentOperator = "none";
}

function handleDecimalPress() {
    if (!currentValue.includes(".")) {
        currentValue += '.'
    }
}

function handleOperatorPress(operator) {
    if (currentOperator === "none") {
        currentOperator = operator; //define operation
        return;
    }

    if (currentOperator !== "none") {
        calculate(currentOperator)
        currentOperator = operator;
    }
}

function calculate(operator) {

    if (operator === "divide") {
        currentValue = parseFloat(previousValue) / parseFloat(currentValue);
    }
    if (operator === "multiply") {
        currentValue = parseFloat(previousValue) * parseFloat(currentValue)
    }
    if (operator === "subtract") {
        currentValue = parseFloat(previousValue) - parseFloat(currentValue)
    }
    if (operator === "add") {
        currentValue = parseFloat(previousValue) + parseFloat(currentValue)
    }

    currentValue = fixFloats(currentValue)
    resetCalculator();
}

function fixFloats(num) {
    if (num > 9999999999 || num < 0.00000001) {
        return "ERROR";
    }
    return Math.round(num * 1000) / 1000;
}

function resetCalculator() {
    currentOperator = "none";
    previousValue = "0";
}