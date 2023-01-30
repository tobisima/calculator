const screen = document.querySelector('.screen');
const numButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
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
  if (operator === divide && b == 0) {
    screen.textContent = ':)';
  } else {
    screen.textContent = +operator(+a, +b).toFixed(8);
    screen.textContent = screen.textContent.slice(0, 10);
  }
}

numButtons.forEach(numButton =>
  numButton.onclick = () => populateDisplay(numButton.textContent));
  
function populateDisplay(targetValue) {
  if (screen.textContent.includes('.') && targetValue === '.') return;
  if (!operatorValue) {  
    if (screen.textContent.length === 10) return;
    screen.textContent += targetValue;
  } else {
    if (screenValueB.length === 10) return;  
    screenValueB += targetValue;
    screen.textContent = screenValueB;
  }
}
      
operatorButtons.forEach(operatorButton =>
  operatorButton.onclick = () => assignOperator(operatorButton.id));

function assignOperator(targetValue) {
  if (operatorValue && screenValueB) showResult();
  screenValueA = screen.textContent;
  operatorValue = targetValue;
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
  screenValueA = '';
  screenValueB = '';
}

backspaceButton.onclick = deleteLastChar;

function deleteLastChar() {
  screen.textContent = screen.textContent.slice(0, length-1);
  screenValueB = screenValueB.slice(0, length-1);
}

document.addEventListener('keydown', inputByKeyboard);

function inputByKeyboard(e) {
  e.preventDefault();
  if (e.key === 'Backspace') deleteLastChar();
  if (e.key === 'Escape' || e.key === 'Delete') clearScreen();
  if (e.key === '=' || e.key === 'Enter') showResult();
  if (e.key === '/' || e.key === '*' || e.key === '-' || e.key === '+') {
    assignOperator(assignOperatorValue()); 
  }
      
  if (!(+e.key) && e.key != 0 && e.key !== '.') return;
    populateDisplay(e.key);

  function assignOperatorValue() {
    return e.key === '/' ? 'divide' :
           e.key === '*' ? 'multiply' :
           e.key === '-' ? 'subtract' : 'add';
  }
}
