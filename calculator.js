const prevDisplay = document.querySelector('.prev-display');
    const currDisplay = document.querySelector('.curr-display');
    const clearButton = document.querySelector('.clear');
    const deleteButton = document.querySelector('.delete');
    const equalButton = document.querySelector('.equal');
    const operationButtons = document.querySelectorAll('.operation');
    const numberButtons = document.querySelectorAll('.number');
    let prevValue = '';
    let currValue = '';
    let currentOperation = null;
    let shouldResetScreen = false;

function resetScreen() {
    currDisplay.textContent = '';
    shouldResetScreen = false;
  }
  function appendNumber(number) {
    if (currDisplay.textContent === '0' || shouldResetScreen) {
      resetScreen();
    }
    // Prevent multiple dots
    if (number === '.' && currDisplay.textContent.includes('.')) return;
    currValue += number;
    currDisplay.textContent = currValue;
  }

function chooseOperation(operation) {
    if (currValue === '') return;
    if (prevValue !== '') {
      compute();
    }
    currentOperation = operation;
    prevValue = currValue;
    updatePrevDisplay();
    currValue = '';
    currDisplay.textContent = '';
  }
  function updatePrevDisplay() {
    prevDisplay.textContent = `${prevValue} ${formatOperation(currentOperation)}`;
  }
  function formatOperation(op) {
    switch(op) {
      case '/':
      case '÷':
        return '÷';
      case '*':
      case '×':

        case '×':
          return '×';
        case '+':
          return '+';
        case '-':
          return '-';
        default:
          return '';
      }
    }
    function compute() {
      if (currentOperation == null || currValue === '') return;
      let computation;
      const prev = parseFloat(prevValue);
      const current = parseFloat(currValue);
      if (isNaN(prev) || isNaN(current)) return;
      switch(currentOperation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
        case '×':
          computation = prev * current;
          break;
        case '/':
        case '÷':
            if (current === 0) {
                alert("Error: Division by zero");
                clear();
                return;
              }
              computation = prev / current;
              break;
            default:
              return;
          }
          currValue = computation.toString();
          currentOperation = null;
          prevValue = '';
          updatePrevDisplay();
          currDisplay.textContent = currValue;
          shouldResetScreen = true;
        }
    function clear() {
      currValue = '';
      prevValue = '';
      currentOperation = null;
      currDisplay.textContent = '';
      prevDisplay.textContent = '';
      shouldResetScreen = false;
    }
 function deleteLast() {
      if (shouldResetScreen) return; // If just computed, deleting does nothing
      currValue = currValue.toString().slice(0, -1);
      currDisplay.textContent = currValue;
    }
    // Event listeners
    numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        appendNumber(button.textContent);
      });
    });
    operationButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Normalize division and multiplication symbols to operators
        let op = button.textContent;
        if (op === '÷') op = '/';
        if (op === '×') op = '*';
        chooseOperation(op);
      });
    });
    equalButton.addEventListener('click', () => {
      compute();
    });
    clearButton.addEventListener('click', () => {
      clear();
    });
    deleteButton.addEventListener('click', () => {
      deleteLast();
    });
 clear();