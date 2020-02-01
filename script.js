'use strict';

class Calculator {
  constructor(prevOperandTextElem, currOperandTextElem) {
    this.prevOperandTextElem = prevOperandTextElem;
    this.currOperandTextElem = currOperandTextElem;
    this.clear();
  }

  clear() {
    this.currOperand = '0';
    this.prevOperand = '';
    this.operation = '';
    this.isFinished = false;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currOperand.includes('.')) return;
    if (this.isFinished) {
      this.clear();
    }
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.isFinished) {
      this.isFinished = !this.isFinished;
    };
    if (this.currOperand === '0') return;

    if (this.prevOperand !== '' && this.currOperand) {
      this.compute();
      this.isFinished = !this.isFinished;
    }
    this.operation = operation;

    if (this.currOperand !== '') {
      this.prevOperand = this.currOperand;
      this.currOperand = '';
    }
    this.prevOperand = this.prevOperand;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '×':
        computation = prev * curr;
        break;
      case '÷':
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currOperand = computation;
    this.operation = '';
    this.prevOperand = '';
    this.isFinished = true;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currOperandTextElem.innerText = this.getDisplayNumber(this.currOperand);
    if (this.operation != null) {
      this.prevOperandTextElem.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    } else {
      this.prevOperandTextElem.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOperandTextElem = document.querySelector('[data-previous-operand]');
const currOperandTextElem = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevOperandTextElem, currOperandTextElem);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});