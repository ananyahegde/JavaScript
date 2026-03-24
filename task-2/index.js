const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculator-display');
const displayText = display.getElementsByTagName("p")[0];
const keys = calculator.querySelector('.calculator-keys');

let isFirst = true;
let op, first, second;

function calculate(first, second, op) {
  let res;

  switch(op)  {
    case '+':
      res = first + second;
      break;

    case '-':
      res = first - second;
      break;

    case '*':
      res = first * second;
      break;

    case '/':
      res = first / second;
      break;
  }

  return res;
}

function clearDisplay() { 
  displayText.textContent = '0'; 
  isFirst = true;
}

function appendInput(input) {
  if (displayText.textContent === '0' && input.textContent === '0') {
  } else if (displayText.textContent === '0' && input.textContent.trim() !== '0') {
    displayText.textContent = input.textContent;
  } else {
    displayText.textContent += input.textContent;
  }
}

function handleOperator(operator) {
  if (isFirst) {
    first = Number(displayText.textContent);
    isFirst = false;
  } else {
    second = Number(displayText.textContent);
    first = calculate(first, second, op);
  }

  op = operator;
  displayText.textContent = '';
}

function handleEquals() {
  second = Number(displayText.textContent);
  
  res = calculate(first, second, op);
  
  displayText.textContent = res;
  isFirst = true;
}
