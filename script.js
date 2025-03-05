// script.js
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let currentInput = "";
let currentOperator = "";
let shouldClearDisplay = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;
        
        if (buttonText.match(/[0-9.]/)) {
            if (shouldClearDisplay) {
                display.textContent = "";
                shouldClearDisplay = false;
            }
            
            // Prevent multiple decimal points
            if (buttonText === '.' && display.textContent.includes('.')) {
                return;
            }
            
            display.textContent = display.textContent === '0' ? buttonText : display.textContent + buttonText;
        } else if (buttonText === "C") {
            display.textContent = "0";
            currentInput = "";
            currentOperator = "";
            shouldClearDisplay = false;
        } else if (buttonText === "=") {
            if (currentOperator && currentInput) {
                try {
                    const result = calculate(parseFloat(currentInput), currentOperator, parseFloat(display.textContent));
                    display.textContent = result.toString();
                    currentInput = result.toString();
                    currentOperator = "";
                    shouldClearDisplay = true;
                } catch (error) {
                    display.textContent = "Error";
                }
            }
        } else {
            // Operator buttons
            currentOperator = buttonText;
            currentInput = display.textContent;
            shouldClearDisplay = true;
        }
    });
});

function calculate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                throw new Error("Division by zero");
            }
        default:
            return num2;
    }
}