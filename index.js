const display = document.getElementById("line");
const buttons = document.querySelectorAll(".btn");
let expression = "";

function evaluateExpression(expr) {
  try {
    const tokens = expr.match(/(\d+(\.\d+)?|[+\-*/])/g);
    if (!tokens) return "Error";

    let output = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNum = parseFloat(tokens[i + 1]);
      if (isNaN(nextNum)) return "Error";

      switch (operator) {
        case "+":
          output += nextNum;
          break;
        case "-":
          output -= nextNum;
          break;
        case "*":
          output *= nextNum;
          break;
        case "/":
          output /= nextNum;
          break;
        default:
          return "Error";
      }
    }
    return output;
  } catch {
    return "Error";
  }
}

function updateDisplay() {
  display.textContent = expression || "0";
}

function handleInput(value) {
  switch (value) {
    case "C":
      expression = "";
      break;
    case "←":
      expression = expression.slice(0, -1);
      break;
    case "=":
      expression = evaluateExpression(expression).toString();
      break;
    default:
      expression += value;
  }
  updateDisplay();
}

// Button click handling
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleInput(button.textContent);
  });
});

// Keyboard input handling
document.addEventListener("keydown", (e) => {
  const key = e.key;
  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "+":
    case "-":
    case "*":
    case "/":
    case ".":
      handleInput(key);
      break;
    case "Enter":
      handleInput("=");
      break;
    case "Backspace":
      handleInput("←");
      break;
    case "Escape":
      handleInput("C");
      break;
  }
});
