const screen = document.querySelector('.screen');
const numButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
let screenValueA = '';
let screenValueB = '';
let operatorValue;      

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}
 
function operate(operator, a, b) {
  if (divide && b == 0) {
    screen.textContent = ':)';
  } else {
    screen.textContent = +operator(+a, +b).toFixed(8);
    screen.textContent = screen.textContent.slice(0, 10);
  }
}

numButtons.forEach(numButton =>
  numButton.onclick = populateDisplay);
  
function populateDisplay(e) {
  if (screen.textContent.includes('.') && e.target.textContent === '.') return;
  if (!operatorValue) {  
    if (screen.textContent.length === 10) return;
    screen.textContent += e.target.textContent;
  } else {
    if (screenValueB.length === 10) return;  
    screenValueB += e.target.textContent;
    screen.textContent = screenValueB;
  }
}
      
operatorButtons.forEach(operatorButton =>
  operatorButton.onclick = assignOperator);

function assignOperator(e) {
  if (operatorValue && screenValueB) showResult();
  screenValueA = screen.textContent;
  operatorValue = e.target.id;
}

equalsButton.onclick = showResult; 

function showResult() {
  operate(window[operatorValue], screenValueA, screenValueB);
  screenValueB = '';    
}

clearButton.onclick = clearScreen;

function clearScreen() {
  screen.textContent = '';
  operatorValue = '';
}


