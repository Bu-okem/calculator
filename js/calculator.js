let runningTotal = 0;
let runningTotal2 = 0; 
let buffer = "0";
let previousOperator = null;
const display = document.querySelector(".display");


document.querySelector(".buttons").addEventListener("click", function(event) {
    buttonClick(event.target.innerText)
});

function buttonClick (value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value)
    } 
    else {
        handleNumber(value)
    }

    render()
};

function handleNumber (value) {
    if (buffer.length === 26) {
        buffer = buffer;
    }
    else if (buffer === "0") {
        buffer = value;
    }
    else if (buffer === "-0") {
        buffer = "-" + value;
    }
    else {
        buffer = buffer + value;
    }
        
}


function handleSymbol (value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        case '+/-':
            if (!buffer.includes('-')) {
                buffer = "-" + buffer;
                break
            }
            else {
                buffer = buffer.substring(1, buffer.length);
            }
            break
        case '+':
            runningTotal = buffer;
            buffer = "0";
            previousOperator = '+';
            break
        case '−':
            runningTotal = buffer;
            buffer = "0";
            previousOperator = '−';
            break
        case '×':
            runningTotal = buffer;
            buffer = "0";
            previousOperator = '×';
            break
        case '÷':
            runningTotal = buffer;
            buffer = "0";
            previousOperator = '÷';
            break
        case '=':
            if (previousOperator === null) {
                return
            }
            else operator ();
            break
        case '.':
            if (buffer.includes('.')) {
                break
            }
            buffer = buffer + value;
            break
        default:
            break;
    }
}

function operator () {
    switch (previousOperator) {
        case '+':
            runningTotal2 = buffer;
            buffer = parseFloat(runningTotal) + parseFloat(runningTotal2);
            buffer = "" + buffer;
            reset();
            break
        case '−':
            runningTotal2 = buffer;
            buffer = parseFloat(runningTotal) - parseFloat(runningTotal2);
            buffer = "" + buffer;
            reset();
            break
        case '×':
            runningTotal2 = buffer;
            buffer = parseFloat(runningTotal) * parseFloat(runningTotal2);
            console.log(parseFloat(runningTotal) * parseFloat(runningTotal2));
            buffer = "" + buffer;
            reset();
            break
        case '÷':
            runningTotal2 = buffer;
            buffer = parseFloat(runningTotal) / parseFloat(runningTotal2);
            buffer = "" + buffer;
            reset();
            break
    }
}

function reset () {
    previousOperator = null;
    runningTotal = 0;
    runningTotal2 = 0;
}

function render () {
    display.innerText = buffer;
}