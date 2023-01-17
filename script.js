const screen = document.querySelector('.screen');
const numButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
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
  screen.textContent = operator(+a, +b);
}

numButtons.forEach(numButton =>
  numButton.onclick = populateDisplay);
  
function populateDisplay(e) {
  if (!operatorValue) {
    screen.textContent += e.target.textContent;
  } else {  
    screenValueB += e.target.textContent;
    screen.textContent = screenValueB;
  }
}
      
operatorButtons.forEach(operatorButton =>
  operatorButton.onclick = assignOperator);

  function assignOperator(e) {
  screenValueA = screen.textContent;
  operatorValue = e.target.id;
}
  
equalsButton.onclick = showResult; 

function showResult() {
  operate(window[operatorValue], screenValueA, screenValueB);
  screenValueB = '';  
}