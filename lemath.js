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

// select the section with the numbers
function calculator (event) {
    const condition = event.target.id !== "";
    const isNotNegate = event.target.id !== "negate";
    const isNotDot = event.target.id !== "dot";

    let numbers = [1,2,3,4,5,6,7,8,9,0];
    
    if (condition && (isNotNegate && isNotDot)) { // prevents inputting other than the numbers
        if (currentNumber.textContent == "0") {
            currentNumber.textContent = ""; // for the sake of changing the number from 0 to any
        }
        for (let i in numbers) {
            if (event.target.id == numbers[i]) {
                currentNumber.textContent += event.target.id;
            }
        }
        if (!eventFire) {
            varA = currentNumber.textContent;
        } else {
            placeHolderNumber.textContent = ""; // sets the placeholder text to be empty as soon as the number is inputted
            varB = currentNumber.textContent;
            placeHolderNumber.replaceWith(currentNumber); // replace the placeholder text with varB
        }
    }

    // negate function
    if (condition && event.target.id == "negate") {
        if (currentNumber.textContent !== "0") {
            if (!isMinus) {
                negative.textContent = "-"
                isMinus = true;
            } else {
                negative.textContent = "";
                isMinus = false;
            }
        }
    }

}

numButtons.addEventListener("click", calculator);

// select the operations section

const opButtons = document.querySelector(".operations-buttons");

let negative = document.querySelector(".negative");

let currentOperator = "";
let operator = "";

let result = "";

let isMinus = false; // for the negate

function operate (event) {
    const condition = event.target.id !== "";
    let operatorsArr = ["+", "-", "/", "x"];
    
    if (condition) {
        for (let i in operatorsArr) {
            if (event.target.id == operatorsArr[i]) {
                eventFire = true; // after any operator is pressed, switches to varB (and stays on varB)
                placeHolderNumber.textContent = currentNumber.textContent; // placeholder number after pressing any operator, assume number is varA
                if (varA == "") { 
                    varA = 0; // if we don't input anything at all, just assume varA is 0
                    placeHolderNumber.textContent = "0";
                }
                currentNumber.textContent = ""; // set current number to nothing
                currentNumber.replaceWith(placeHolderNumber); // replace current number with placeHolderNumber

                if (currentOperator !== "") { // checks first if current operator has either +, 0 , *, / or %
                    operator = currentOperator; // assigns a previous variable called 'operator' to current operator
                }        
                currentOperator = event.target.id; // set the current operator variable with either +, -, *, /, or %

                /*
                to do: add number history
                // numberHistory.textContent += varA + " " + event.target.id + " " + varB; // set the display thing
                */
               
                if (varB == "") {
                    placeHolderNumber.textContent = varA; // just display the placeHolder text, currentNumber remains empty
                }
                
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
                    console.log(result);
                    varA = result;
                    varB = "";
                    placeHolderNumber.textContent = result;
                }
            }


        }
        
        
    }
}

opButtons.addEventListener("click", operate);

/*

to do:
add negate feature

*/

/*

to do:
add evaluation feature

*/

let clearButton = document.querySelector(".clear");
function clearEntry () {
    varA = "";
    varB = "";
    isMinus = false;
    negative.textContent = "";
    eventFire = false;
    currentNumber.textContent = "0";
    placeHolderNumber.replaceWith(currentNumber);
}
clearButton.addEventListener("click", clearEntry);


let eraseButton = document.querySelector(".erase");
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


