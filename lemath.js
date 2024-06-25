// select the screen
let currentNumber = document.querySelector(".current-number");

// select the history thingy
let numberHistory = document.querySelector(".number-history");

// variable setups
let varA = "";
let varB = "";

// select all the buttons
const numButtons = document.querySelector(".numbers-buttons");

// select status bar for displaying what kind of error

let statusBar = document.querySelector(".status");

// certain goofy conditions and variables
let eventFire = false;
let placeHolderNumber = document.createElement("h1");
placeHolderNumber.setAttribute("class", "current-number");

let negative = document.querySelector(".negative"); // for minus thingy
negative.textContent = "";

let varACopy = varAEval = varAText = varBText = "";

let hasTyped = false;

let isError = false; // for errors such as divide by 0

// select the section with the numbers
function inputNumber (event) {
    const condition = event.target.className === "calc-button"

    const numbers = [0,1,2,3,4,5,6,7,8,9];

    // negate function
    if (condition) { // prevents inputting other than the numbers
        for (let i in numbers) {
            if (event.target.id == numbers[i]) {
                if (currentNumber.textContent === "0" && event.target.id !== "negate") {
                    currentNumber.textContent = ""; // for the sake of changing the number from 0 to any
                }
                currentNumber.textContent += event.target.id;
                if (currentNumber.textContent.length > 15) { // set maximum length
                    numButtons.removeEventListener("click", inputNumber)
                    statusBar.textContent = "Max length of 15 reached"
                } else if (currentNumber.textContent.length < 15) {
                    statusBar.textContent = "";
                }
            }
            if (isError) { // if any error is encountered, should the user press any number, it will reset
                clear();
            }
            if (evalMode) {
                clear();
                evalMode = false;
            }
            if (!hasTyped) {
                hasTyped = true;
            }
        }

        if (!eventFire) {
            varA = varACopy = varAText = negative.textContent + currentNumber.textContent;
        } else {
            varB = varBText = negative.textContent + currentNumber.textContent;
            placeHolderNumber.replaceWith(currentNumber);
        }
    }
}

const negateButton = document.querySelector(".negate-button");

function negateNumber () {
    if (currentNumber.textContent === "0") {
        console.error("intentional error"); 
    } else {
        if (!isMinus) {
            negative.textContent = "-";
            if (!eventFire) {
                varA = varACopy = varAText = negative.textContent + currentNumber.textContent;
            } else {
                varB = varBText = negative.textContent + currentNumber.textContent;
            }
            if (!hasTyped) {
                varB = varBText = -parseFloat(varACopy);
                placeHolderNumber.textContent = parseFloat(-varB);
            }
            isMinus = true;
        } else {
            negative.textContent = "";
            if (!eventFire) {
                varA = varACopy = varAText = negative.textContent + currentNumber.textContent;
            } else {
                varB = varBText = negative.textContent + currentNumber.textContent;
            }
            if (!hasTyped) {
                varB = varBText = -parseFloat(varACopy);
                placeHolderNumber.textContent = parseFloat(varB);
            }
            isMinus = false;
        }
    }
}

negateButton.addEventListener("click", negateNumber);

const decimalButton = document.querySelector(".decimal-button");

function addDecimal () {
    currentNumber.textContent += ".";
    decimalButton.removeEventListener("click", addDecimal)
}

decimalButton.addEventListener("click", addDecimal);


numButtons.addEventListener("click", inputNumber);

// select the operations section

const opButton = document.querySelectorAll(".operation-button"); // optimize this later

let chosenOperator = "";
let currentOperator = "";

let result = "";

let isMinus = false; // for the negate

function operate (event) {
    const condition = event.target.id !== "";
    const operatorsArr = ["+", "-", "/", "x"];
    hasTyped = false;

    statusBar.textContent = "";
    numButtons.addEventListener("click", inputNumber); // if exceed 15 and after pressing any operate button

    if (condition) {
        for (let i in operatorsArr) {
            decimalButton.addEventListener("click", addDecimal);
            if (event.target.id == operatorsArr[i]) {
                eventFire = true; // after any currentOperator is pressed, switches to varB (and stays on varB)
                if (chosenOperator !== "") { // checks first if current currentOperator has either +, 0 , *, / or %
                    currentOperator = chosenOperator; // assigns a previous variable called 'currentOperator' to current currentOperator
                }        

                chosenOperator = event.target.id; // set the current currentOperator variable with either +, -, *, /, or %

                if (varA === "") {
                    varA = 0;
                    varAText = 0; // if we don't input anything at all, just assume varA is 0
                    placeHolderNumber.textContent = "0"; // placeholder number set to 0
                    currentNumber.replaceWith(placeHolderNumber) // then replace the current number with place holder, current number is 0
                }

                currentNumber.textContent = ""; // set current number to nothing, so we can input varB

                if (evalMode) { // preventing from adding / substracting the result with varB after pressing any currentOperator
                    varB = "";
                    evalMode = false; // disabling evaluate
                }

                varAEval = negative.textContent + parseFloat(varA) + parseFloat(varB); // for evaluate only
                if (varB === "") {
                    varAEval = negative.textContent + parseFloat(varA); // also for evaluate only
                }
                if (varB !== "") {
                    // the currentOperator
                    let a = parseFloat(varA);
                    let b = parseFloat(varB);

                    switch (currentOperator) {
                        case "+":
                            result = a + b;
                            break;
                        case "-":
                            result = a - b;
                            break;
                        case "x":
                            result = a * b;
                            break;
                        case "/":
                            if (b === 0) {
                                error(1);
                                numberHistory.textContent = varAText + " " + currentOperator + " " + varB + " " + chosenOperator + " ";
                                placeHolderNumber.textContent = "Can't divide by zero";
                                currentNumber.replaceWith(placeHolderNumber);

                                isError = true;
                            } else {
                                result = a / b;
                            }
                            break;
                    }
                    if (result === Infinity) {
                        error(2);
                    }
                    varA = result;
                    varAText = result;
                    varB = "";
                }
            
                if (varA !== "") { // varA will be set to result too        
                    numberHistory.textContent = varAText + " " + chosenOperator + " "; // adds the history
                    placeHolderNumber.textContent = varA; // set the placeholder to varA or the result (first time is always varA)
                    currentNumber.replaceWith(placeHolderNumber); // replace currentnumber with placeholder
                    currentNumber.textContent = ""; // empties the current number to input varB
                }
                negative.textContent = "";
            }
        }
    }
}

opButton.forEach((item) => {
    item.addEventListener("click", operate);
});

function error(code) {

    opButton.forEach(item => {
        item.removeEventListener("click", operate);
        item.style.backgroundColor = "#242424";
    });
    evaluateButton.removeEventListener("click", evaluate);
    exponent.forEach(item => {
        item.removeEventListener("click", addExponent);
        item.style.backgroundColor = "#242424";
    });
    decimalButton.removeEventListener("click", addDecimal);
    decimalButton.style.backgroundColor = "#242424";
    negateButton.removeEventListener("click", negateNumber);
    negateButton.style.backgroundColor = "#242424";
    
    switch (code) {
        case 1:
            statusBar.textContent = "Error 1 Can't divide by 0";
            break;
        case 2:
            statusBar.textContent = "Error 2 Overflow, usually number too large";
            break;
    }
}

let exponent = document.querySelectorAll(".exponent");
let chosenExponent = "";

function addExponent (event) {
    // to do
    const exponent = ["sqr", "sqrt", "1/x"];
    for (let i in exponent) {
        if (event.target.id === exponent[i]) {
            chosenExponent = event.target.id;
            if (!eventFire || evalMode) {
                if (negative.textContent === "-") {
                    negative.textContent = "";
                }
                if (currentNumber.textContent === "0") {
                    varACopy = varA = "0";
                }
                switch (chosenExponent) {
                    case "sqr":
                        varAText = `sqr(${varA})`;
                        varACopy = varA = Math.pow(varA, 2);
                        if  (varA === Infinity) {
                            error(2);
                        }
                        break;
                    case "sqrt":
                        varAText = `sqrt(${varA})`
                        varACopy = varA = Math.sqrt(varA);
                        break;
                    case "1/x":
                        varAText = `1/${varA}`;
                        varACopy = varA = 1 / varA;
                        if (currentNumber.textContent === "0") {
                            error(1);
                            isError = true;
                        }
                        break;
                }
                currentNumber.textContent = placeHolderNumber.textContent = varA;
                if (isError) {
                    placeHolderNumber.textContent = "Can't divide by zero";
                }
                numberHistory.textContent = varAText;
            }
            else if (eventFire) {
                if (varB === "") {
                    varB = varA;
                }
                switch (chosenExponent) {   
                    case "sqr":
                        varBText = `sqr(${varB})`;
                        varB = Math.pow(varB, 2);
                        break;
                    case "sqrt":
                        varBText = `sqrt(${varB})`
                        varB = Math.sqrt(varB);
                        break;
                    case "1/x":
                        varBText = `1/${varB}`;
                        varB = 1 / varB;
                        if (currentNumber.textContent === "0") {
                            error(1);
                            isError = true;
                        }
                        break;
                }
                placeHolderNumber.textContent = varB;
                numberHistory.textContent = varAText + " " + chosenOperator + " " + varBText;
            } 
        }
    }
    if (event.target.id === "%") { 
        varB = varA * (varB / 100);
        placeHolderNumber.textContent = varB
        numberHistory.textContent = varAText + " " + chosenOperator + " " + varB;
    }
    currentNumber.replaceWith(placeHolderNumber);
}

exponent.forEach((item) => item.addEventListener("click", addExponent))

const evaluateButton = document.querySelector("#evaluate");
let evalMode = false;

function evaluate () { 
    evalMode = true; // repeatedly count with the same varB
    negative.textContent = "";
    isMinus = false;
    let a = parseFloat(varA);
    let b = parseFloat(varB);
    if (chosenOperator) {
        if (varB === "") {
            b = parseFloat(varAEval);
            varBText = b;
        }
        switch (chosenOperator) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "x":
                result = a * b;
                break;
            case "/":
                if (b === 0) {
                    error(1);
                    b = 0;
                    isError = true;
                } else {
                    result = a / b;
                }
                break;
        }
        if (result === Infinity) {
            error(2);
        }
        varA = result;
        placeHolderNumber.textContent = varA;
        
        if (isError) {
            placeHolderNumber.textContent = "Can't divide by zero";
        } 
        numberHistory.textContent = varAText + " " + chosenOperator + " " + varBText + " = ";

        varAText = result;
        currentNumber.replaceWith(placeHolderNumber);

    }
    else if (varB === "") {
        if (varA === "") {
            a = 0;
        }
        numberHistory.textContent = a + " " + "=";
    }
}

evaluateButton.addEventListener("click", evaluate);

// Clear, erase, and clear entry button

const clearAll = document.querySelector("#clear");

function clear () {
    varA = "";
    varB = "";
    varACopy = "";
    varAText = "";
    varBText = "";
    result = "";
    isMinus = false;
    isError = false;
    negative.textContent = "";
    eventFire = false;
    currentOperator = "";
    chosenOperator = "";
    currentNumber.textContent = "0";
    numberHistory.textContent = "";
    placeHolderNumber.textContent = "";
    numButtons.addEventListener("click", inputNumber);
    statusBar.textContent = "";
    // resets all the blacked out buttons' style and clickable
    placeHolderNumber.replaceWith(currentNumber);
    opButton.forEach(item => {
        item.addEventListener("click", operate);
        item.style.backgroundColor = null;
    });
    evaluateButton.addEventListener("click", evaluate);
    exponent.forEach(item => {
        item.addEventListener("click", addExponent);
        item.style.backgroundColor = null;
    });
    decimalButton.addEventListener("click", addDecimal);
    decimalButton.style.backgroundColor = null;
    negateButton.addEventListener("click", negateNumber);
    negateButton.style.backgroundColor = null;
}
clearAll.addEventListener("click", clear);


const eraseButton = document.querySelector("#erase");

function erase () {
    currentNumber.textContent = currentNumber.textContent.substring(0, currentNumber.textContent.length - 1);
    if (currentNumber.textContent.length == 0) {
        currentNumber.textContent = "0";
    }
    if (!eventFire) {
        varA = varACopy = varAText = negative.textContent + currentNumber.textContent;
    } else {
        varB = varBText = negative.textContent + currentNumber.textContent;
    }
    if (isError) {
        clear();
    }
    numButtons.addEventListener("click", inputNumber);
    statusBar.textContent = "";
}
eraseButton.addEventListener("click", erase);

const clearEntryButton = document.querySelector("#clearEntry");

function clearEntry () {
    currentNumber.textContent = "0"
    if (isError) {
        clear();
    }
}

clearEntryButton.addEventListener("click", clearEntry);