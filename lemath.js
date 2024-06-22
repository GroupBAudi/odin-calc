// select the screen
let currentNumber = document.querySelector(".current-number");

// select the history thingy
let numberHistory = document.querySelector(".number-history");

// variable setups
let varA = "";
let varB = "";

// select all the buttons
const numButtons = document.querySelector(".numbers-buttons");

// certain goofy conditions and variables
let eventFire = false;
let placeHolderNumber = document.createElement("h1");
placeHolderNumber.setAttribute("class", "current-number");

let negative = document.querySelector(".negative"); // for minus thingy
negative.textContent = "";

let varACopy = varAEval = varAText = varBText = "";

let hasTyped = 0;

let isError = false; // for errors such as divide by 0

// select the section with the numbers
function inputNumber (event) {
    const condition = event.target.id !== "";
    const isNotDot = event.target.id !== "dot";
    const isNotOpButton = event.target.className !== "calc-button operation-button"; // optimize this late;

    const numbers = [1,2,3,4,5,6,7,8,9,0];

    // negate function
    if (condition && isNotDot && isNotOpButton) { // prevents inputting other than the numbers
        // to do
        if (event.target.id === "negate") { // selects only the negate button
            if (currentNumber.textContent === "0") {
                console.error("intentional error"); 
            } else {
                if (!isMinus) {
                    negative.textContent = "-";
                    if (hasTyped === 0) {
                        varB = parseFloat(varACopy);
                        varBText = `negate(${varB})`
                        currentNumber.textContent = parseFloat(varACopy);
                        numberHistory.textContent = varAText + " " + chosenOperator + " " + varBText;
                    }
                    isMinus = true;
                } else {
                    negative.textContent = "";
                    if (hasTyped === 0) {
                        varB = parseFloat(varACopy);
                        varBText = `negate(${varB})`
                        currentNumber.textContent = parseFloat(varACopy) * -1;
                        numberHistory.textContent = varAText + " " + chosenOperator + " " + varBText;
                    }
                    isMinus = false;
                }
            }
        }

        for (let i in numbers) {
            if (currentNumber.textContent === "0" && event.target.id !== "negate") {
                currentNumber.textContent = ""; // for the sake of changing the number from 0 to any
            }
            if (event.target.id == numbers[i]) {
                currentNumber.textContent += event.target.id;
                if (currentNumber.textContent.length > 15) { // set maximum length
                    console.log("stahp");
                    numButtons.removeEventListener("click", inputNumber)
                }
            }
            if (isError) { // if any error is encountered, should the user press any number, it will reset
                clear();
                isError = false;
            }
            if (evalMode) {
                clear();
                evalMode = false;
            }
            if (hasTyped === 0) {
                isMinus = false;
                hasTyped++;
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

const decimalButton = document.querySelector(".decimal-button");
let hasDecimal = false;

function addDecimal () {
    currentNumber.textContent += ".";
    hasDecimal = true;
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

    numButtons.addEventListener("click", inputNumber);
    decimalButton.addEventListener("click", addDecimal);

    hasTyped = 0;
    if (condition) {
        for (let i in operatorsArr) {
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
                                opButton.forEach(item => {
                                    item.removeEventListener("click", operate);
                                    item.style.backgroundColor = "#242424";
                                });
                                evaluateButton.removeEventListener("click", evaluate);
                                exponent.forEach(item => {
                                    item.removeEventListener("click", addExponent);
                                    item.style.backgroundColor = "#242424";
                                });

                                numberHistory.textContent = varAText + " " + currentOperator + " " + varB + " " + chosenOperator + " ";
                                placeHolderNumber.textContent = "Can't divide by zero";
                                currentNumber.replaceWith(placeHolderNumber);

                                isError = true;
                            } else {
                                result = a / b;
                            }
                            break;
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
})

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
                switch (chosenExponent) {
                    case "sqr":
                        varAText = `sqr(${varA})`;
                        varACopy = varA = Math.pow(varA, 2);
                        break;
                    case "sqrt":
                        varAText = `sqrt(${varA})`
                        varACopy = varA = Math.sqrt(varA);
                        break;
                    case "1/x":
                        varAText = `1/${varA}`;
                        varACopy = varA = 1 / varA;
                        break;
                }
                currentNumber.textContent = placeHolderNumber.textContent = varA;
                numberHistory.textContent = varAText;
            }
            else if (eventFire) {
                if (varB === "") {
                    varB = varACopy;
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
                    opButton.forEach(item => {
                        item.removeEventListener("click", operate);
                        item.style.backgroundColor = "#242424";
                    });
                    evaluateButton.removeEventListener("click", evaluate);
                    exponent.forEach(item => {
                        item.removeEventListener("click", addExponent);
                        item.style.backgroundColor = "#242424";
                    });
    
                    b = 0;
    
                    isError = true;
                } else {
                    result = a / b;
                }
                break;
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
    negative.textContent = "";
    eventFire = false;
    currentOperator = "";
    chosenOperator = "";
    currentNumber.textContent = "0";
    numberHistory.textContent = "";
    placeHolderNumber.textContent = "";
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
}
clearAll.addEventListener("click", clear);


const eraseButton = document.querySelector("#erase");

function erase () {
    currentNumber.textContent = currentNumber.textContent.substring(0, currentNumber.textContent.length - 1);
    if (currentNumber.textContent.length == 0) {
        currentNumber.textContent = "0";
    }
    if (!eventFire) {
        varA = negative.textContent + currentNumber.textContent;
        varACopy = negative.textContent + currentNumber.textContent;
        varAText = negative.textContent + currentNumber.textContent;
    } else {
        varB = negative.textContent + currentNumber.textContent;
        varBText = negative.textContent + currentNumber.textContent;
    }
    if (isError) {
        clear();
        isError = false;
    }
}
eraseButton.addEventListener("click", erase);

const clearEntryButton = document.querySelector("#clearEntry");

function clearEntry () {
    currentNumber.textContent = "0"
    if (isError) {
        clear();
        isError = false;
    }
}

clearEntryButton.addEventListener("click", clearEntry);