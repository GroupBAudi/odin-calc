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

// select the section with the numbers
function calculator (event) {
    const condition = event.target.id !== "";
    const isNotDot = event.target.id !== "dot";
    const isNotOpButton = event.target.className !== "calc-button operation-button"; // optimize this later
    let currId = event.target.id;

    let numbers = [1,2,3,4,5,6,7,8,9,0];
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
            }
        }

        if (!eventFire) {
            varA = negative.textContent + currentNumber.textContent;
            // varACopy = negative.textContent + currentNumber.textContent;
        } else {
            varB = negative.textContent + currentNumber.textContent;
            placeHolderNumber.replaceWith(currentNumber);
        }
    }
}

numButtons.addEventListener("click", calculator);

// select the operations section

const opButton = document.querySelectorAll(".operation-button-container"); // optimize this later

let currentOperator = "";
let operator = "";

let result = "";

let isMinus = false; // for the negate

function operate (event) {
    const condition = event.target.id !== "";
    let operatorsArr = ["+", "-", "/", "x"];
    // console.log(event.target.id == "evaluate");
    
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

                varACopy = negative.textContent + parseFloat(varA) + parseFloat(varB);
                if (varB === "") {
                    varACopy = negative.textContent + parseFloat(varA);
                }
                
                // the operation
                if (varB !== "") {
                    let a = parseFloat(varA);
                    let b = parseFloat(varB);

                    if (operator == "+") {
                        result = a + b;
                    } else if (operator == "-") {
                        result = a - b;
                    } else if (operator == "x") {
                        result = a * b;
                    } else if (operator == "/") {
                        result = a / b;
                    }
                    console.log(varA, varB);
                    varA = result;
                    varB = "";
                }

                if (varA !== "") { // varA will be set to result too
                    console.log(varA);
                    numberHistory.textContent = varA + " " + currentOperator + " "; // adds the history
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


let evaluateButton = document.querySelector("#evaluate");

let evalMode = false;

function evaluate () { 
    console.log("evaluate");
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
    
        varA = result;
        placeHolderNumber.textContent = varA;
        currentNumber.replaceWith(placeHolderNumber);
    
        numberHistory.textContent = a + " " + currentOperator + " " + b + " " + " = ";
    }
    else if (varB === "") {
        numberHistory.textContent = a + " " + "="
    }
}

evaluateButton.addEventListener("click", evaluate)

// Clear, erase, and clear entry button

let clearButton = document.querySelector("#clear");

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
}
clearButton.addEventListener("click", clear);


let eraseButton = document.querySelector("#erase");
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


