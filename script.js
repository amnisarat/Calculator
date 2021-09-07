const dataPrevious = document.querySelector('[data-previous]');
const dataCurrent = document.querySelector('[data-current]');
const dataClear = document.querySelector('[data-clear]');
const dataDelete = document.querySelector('[data-delete]');
const dataEquels = document.querySelector('[data-equels]');


const dataOperation = document.querySelectorAll('[data-operation]');
const dataNumber = document.querySelectorAll('[data-number]');

class Calculator {
    constructor(dataPrevious, dataCurrent) {
        this.dataPrevious = dataPrevious;
        this.dataCurrent = dataCurrent
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    //setting show number 
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            // หยุดการทำงาน
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // คำนวน
    flushOparator(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let computation;

        if (isNaN(previous) || isNaN(current)) return;

        switch (this.operation) {
            case "+":
                computation = previous + current;
                break;
            case "-":
                computation = previous - current;
                break;
            case "*":
                computation = previous * current;
                break;
            case "/":
                computation = previous / current;
                break;

            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = "";
    }

    updateDisplay() {
        this.dataCurrent.innerText = this.currentOperand;
        if (this.operation !== null) {
            this.dataPrevious.innerText = `${this.previousOperand} ${this.operation}`
        }
    }
}


const calculator = new Calculator(dataPrevious, dataCurrent);

dataNumber.forEach((dataButton) => {
    dataButton.addEventListener('click', () => {
        calculator.appendNumber(dataButton.innerText);
        calculator.updateDisplay();
    });
});


dataOperation.forEach((dataOparand) => {
    dataOparand.addEventListener('click', () => {
        calculator.flushOparator(dataOparand.innerText);
        calculator.updateDisplay();
    });
});

dataEquels.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

dataClear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});


dataDelete.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});
