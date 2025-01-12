let display = document.getElementById('display');

// Initialize the current input and previous input
let currentInput = '';
let previousInput = '';
let operator = '';

// Update the display with the input
function updateDisplay() {
    display.value = currentInput || '0'; // Display '0' if no input
}

// Handle button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        let buttonText = button.textContent;

        // Handle decimal point to ensure only one is added
        if (buttonText === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.'; // Only add decimal if not already present
            }
            updateDisplay();
        }

        // Handle AC button to reset the inputs
        else if (buttonText === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay();
        }

        // Handle Square Root button (formerly + / -)
        else if (buttonText === '√') {
            if (currentInput) {
                let number = parseFloat(currentInput);
                if (number < 0) {
                    currentInput = 'Error'; // Square root of negative numbers is not real
                } else {
                    currentInput = Math.sqrt(number).toString(); // Calculate square root
                }
                updateDisplay();
            }
        }

        // Handle percentage calculation
        else if (buttonText === '%') {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay();
            }
        }

        // Handle operators (+, -, *, /)
        else if (['+', '-', '*', '/'].includes(buttonText)) {
            if (currentInput) {
                if (previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator).toString();
                }
                previousInput = currentInput;
                operator = buttonText;
                currentInput = '';
            }
        }

        // Handle number buttons (0-9)
        else if (!isNaN(buttonText)) {
            currentInput += buttonText;
            updateDisplay();
        }

        // Handle equal button for calculation
        else if (buttonText === '=') {
            if (previousInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator).toString();
                previousInput = '';
                operator = '';
                updateDisplay();
            }
            
            // Check if the entered pin is 5555 and then redirect to PIN page
            if (currentInput === '5555') {
                window.location.href = 'pin.html'; // Redirect to the PIN page
            }
        }
    });
});

// Calculate function to evaluate the expression
function calculate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return 'Error';
            }
        default:
            return num2;
    }
}
