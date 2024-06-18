// alert("to do add placeholder number thingy, and work on other function")

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

let varACopy = "";
let varAText = "";

let varBText = "";

let isError = false; // for errors such as divide by 0

// select the section with the numbers
function inputNumber (event) {
    const condition = event.target.id !== "";
    const isNotDot = event.target.id !== "dot";
    const isNotOpButton = event.target.className !== "calc-button operation-button"; // optimize this later
    const currId = event.target.id;

    const numbers = [1,2,3,4,5,6,7,8,9,0];

    // negate function
    if (condition && isNotDot && isNotOpButton) { // prevents inputting other than the numbers
        if (currId === "negate") { // selects only the negate button
            if (currentNumber.textContent === "0") {
                console.error("intentional error");
            } else {
                if (!isMinus) {
                    negative.textContent = "-"
                    isMinus = true;
                } else {
                    negative.textContent = "";
                    isMinus = false;
                }
            }
        }

        for (let i in numbers) {
            if (currentNumber.textContent === "0" && currId !== "negate") {
                currentNumber.textContent = ""; // for the sake of changing the number from 0 to any
            }
            if (currId == numbers[i]) {
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
        }

        if (!eventFire) {
            varA = negative.textContent + currentNumber.textContent;
            varACopy = negative.textContent + currentNumber.textContent; // mainly use for evaluate only
            varAText = negative.textContent + currentNumber.textContent; // mainly used to display the history after adding number 
        } else {
            varB = negative.textContent + currentNumber.textContent;
            varBText = negative.textContent + currentNumber.textContent;
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

const opButton = document.querySelectorAll(".operation-button-container"); // optimize this later

let currentOperator = "";
let operator = "";

let result = "";

let isMinus = false; // for the negate

function operate (event) {
    const condition = event.target.id !== "";
    const operatorsArr = ["+", "-", "/", "x"];

    numButtons.addEventListener("click", inputNumber);
    decimalButton.addEventListener("click", addDecimal);

    if (condition) {
        for (let i in operatorsArr) {
            if (event.target.id == operatorsArr[i]) {
                eventFire = true; // after any operator is pressed, switches to varB (and stays on varB)
                if (currentOperator !== "") { // checks first if current operator has either +, 0 , *, / or %
                    operator = currentOperator; // assigns a previous variable called 'operator' to current operator
                }        

                currentOperator = event.target.id; // set the current operator variable with either +, -, *, /, or %

                if (varA === "") { 
                    varA = 0; // if we don't input anything at all, just assume varA is 0
                    placeHolderNumber.textContent = "0"; // placeholder number set to 0
                    currentNumber.replaceWith(placeHolderNumber) // then replace the current number with place holder, current number is 0
                }

                currentNumber.textContent = ""; // set current number to nothing, so we can input varB

                if (evalMode) { // preventing from adding / substracting the result with varB after pressing any operator
                    varB = "";
                    evalMode = false; // disabling evaluate
                }

                varACopy = negative.textContent + parseFloat(varA) + parseFloat(varB); // for evaluate only
                if (varB === "") {
                    varACopy = negative.textContent + parseFloat(varA);
                }
                
                // the operation
                if (varB !== "") {
                    let a = parseFloat(varA);
                    let b = parseFloat(varB);

                    if (operator === "+") {
                        result = a + b;
                    } else if (operator === "-") {
                        result = a - b;
                    } else if (operator === "x") {
                        result = a * b;
                    } else if (operator === "/") {
                        if (b === 0) {
                            // removes all event listener if varB is 0, cant divide by 0
                            // to do
                            opButton.forEach(item => item.removeEventListener("click", operate));
                            evaluateButton.removeEventListener("click", evaluate);
                            exponent.forEach(item => item.removeEventListener("click", addExponent));

                            numberHistory.textContent = varAText + " " + operator + " " + varB + " " + currentOperator;
                            placeHolderNumber.textContent = "FUCK";
                            currentNumber.replaceWith(placeHolderNumber);

                            isError = true;
                            
                        } else {
                            result = a / b; 
                        }
                    }
                    console.log(varA, varB);
                    varA = result;
                    varAText = result;
                    varB = "";
                }

                if (varA !== "") { // varA will be set to result too
                    numberHistory.textContent = varAText + " " + currentOperator + " "; // adds the history
                    placeHolderNumber.textContent = varA; // set the placeholder to varA or the result (first time is always varA)
                    currentNumber.replaceWith(placeHolderNumber); // replace currentnumber with placeholder
                    currentNumber.textContent = ""; // empties the current number to input varB
                }

                isMinus = false; // each time operator is pressed, automatically remove negative.
                negative.textContent = "";
            }
        }
    }
}

opButton.forEach((item) => {
    item.addEventListener("click", operate);
})

let exponent = document.querySelectorAll(".exponent");

function addExponent (event) {
    // to do
    const exponent = ["sqr", "sqrt", "1/x"];
    for (let i in exponent) {
        if (event.target.id === exponent[i]) {
            if (!eventFire) {
                if (event.target.id === "sqr") {
                    varAText = `sqr(${varA})`;
                    varA = Math.pow(varA, 2);
                } else if (event.target.id === "sqrt") {
                    varAText = `sqrt(${varA})`
                    varA = Math.sqrt(varA);
                } else if (event.target.id === "1/x") {
                    varAText = `1/${varA}`;
                    varA = 1 / varA;
                }
                placeHolderNumber.textContent = varA;
                numberHistory.textContent = varAText;
            }
            else if (eventFire) {
                if (event.target.id === "sqr") {
                    varBText = `sqr(${varB})`;
                    varB = Math.pow(varB, 2);
                } else if (event.target.id === "sqrt") {
                    varBText = `sqrt(${varB})`
                    varB = Math.sqrt(varB);
                } else if (event.target.id === "1/x") {
                    varBText = `1/${varB}`;
                    varB = 1 / varB;
                }
                placeHolderNumber.textContent = varB;
                numberHistory.textContent = varAText + " " + currentOperator + " " + varBText;
            }
        }
    }
    if (event.target.id === "%") { 
        varB = varA * (varB / 100);
        placeHolderNumber.textContent = varB
        numberHistory.textContent = varAText + " " + currentOperator + " " + varB;
    }
    currentNumber.replaceWith(placeHolderNumber);
}

exponent.forEach((item) => item.addEventListener("click", addExponent))

const evaluateButton = document.querySelector("#evaluate");
let evalMode = false;

function evaluate () { 
    evalMode = true; // repeatedly count with the same varB
    let a = parseFloat(varA);
    let b = parseFloat(varB);
    if (currentOperator) {
        if (varB === "") {
            b = parseFloat(varACopy);
        }
        if (currentOperator == "+") {
            result = a + b;
        } else if (currentOperator == "-") {
            result = a - b;
        } else if (currentOperator == "x") {
            result = a * b;
        } else if (currentOperator == "/") {
            result = a / b;
        }
    
        numberHistory.textContent = varAText + " " + currentOperator + " " + b + " " + " = ";

        varA = result;
        varAText = result;
        placeHolderNumber.textContent = varA;
        currentNumber.replaceWith(placeHolderNumber);
        
    }
    else if (varB === "") {
        numberHistory.textContent = a + " " + "="
    }
}

evaluateButton.addEventListener("click", evaluate);

// Clear, erase, and clear entry button

const clearAll = document.querySelector("#clear");

function clear () {
    varA = "";
    varB = "";
    isMinus = false;
    negative.textContent = "";
    eventFire = false;
    currentNumber.textContent = "0";
    numberHistory.textContent = "";
    placeHolderNumber.textContent = "";
    placeHolderNumber.replaceWith(currentNumber);
    opButton.forEach(item => item.addEventListener("click", operate));
    evaluateButton.addEventListener("click", evaluate);
    exponent.forEach(item => item.addEventListener("click", addExponent));
}
clearAll.addEventListener("click", clear);


const eraseButton = document.querySelector("#erase");

function erase () {
    currentNumber.textContent = currentNumber.textContent.substring(0, currentNumber.textContent.length - 1);
    if (currentNumber.textContent.length == 0) {
        currentNumber.textContent = "0";
    }
    if (!eventFire) {
        varA = currentNumber.textContent;
    } else {
        varB = currentNumber.textContent;
    }
}
eraseButton.addEventListener("click", erase);

const clearEntryButton = document.querySelector("#clearEntry");

function clearEntry () {
    currentNumber.textContent = "0"
}

clearEntryButton.addEventListener("click", clearEntry);