let runningTotal = 0;
let runningTotal2 = 0; 
let buffer = "0";
let eqnBuffer = "";
let previousOperator = null;
const display = document.querySelector(".ans-display");
const equation = document.querySelector(".eqn-display");


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
        eqnBuffer = eqnBuffer + buffer;
    }
    else if (buffer === "-0") {
        buffer = "-" + value;
        eqnBuffer = eqnBuffer + buffer;
    }
    else {
        buffer = buffer + value;
        eqnBuffer = eqnBuffer + value;
    }        
}


function handleSymbol (value) {
    switch (value) {
        case 'C':
            buffer = "0";
            eqnBuffer = "";
            runningTotal = 0;
            previousOperator = null;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = "0";
                eqnBuffer = "";
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
                eqnBuffer = eqnBuffer.substring(0, eqnBuffer.length - 1);
            }
            break;
        case '+/-':
            if (!buffer.includes('-')) {
                buffer = "-" + buffer;
                eqnBuffer = buffer;
                break
            }
            else {
                buffer = buffer.substring(1, buffer.length);
                eqnBuffer = buffer;
            }
            break
        case '+':
            runningTotal = buffer;
            previousOperator = '+';
            eqnBuffer = buffer + previousOperator;
            buffer = "0";
            break
        case '−':
            runningTotal = buffer;
            previousOperator = '−';
            eqnBuffer = buffer + previousOperator;
            buffer = "0";
            break
        case '×':
            runningTotal = buffer;
            previousOperator = '×';
            eqnBuffer = buffer + previousOperator;
            buffer = "0";
            break
        case '÷':
            runningTotal = buffer;
            previousOperator = '÷';
            eqnBuffer = buffer + previousOperator;
            buffer = "0";
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
            eqnBuffer = eqnBuffer + value;
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
    equation.innerText = eqnBuffer;
}


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/file-sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}