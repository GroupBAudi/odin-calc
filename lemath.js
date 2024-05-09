// initial setup

let screen = document.querySelector(".screen");
let currNum = document.querySelector(".current-number");
let placeHolder = document.createElement("h1");
let toBeAdded = document.querySelector(".number-to-be-added");
let history = document.createElement("p")

// selects the number section of the calculator

const numberButton = document.querySelector(".numbers-buttons");
const operationsButton = document.querySelector(".operations-buttons");

let result;
let eventFire = false;
let allowChangeOper = false;

toBeAdded.textContent = "";

function addNumber(event) {
    let condition = event.target.className !== "numbers-buttons"
    let notZero = (event.target.textContent == "0" || event.target.textContent == "00" )
    let target = event.target.textContent;
    if (condition && event.target.id != "dot") {
        if (notZero && !currNum.textContent) {
            console.error("enter number first blin");
        } else  {
            currNum.textContent += target;
            screen.appendChild(currNum);
            if (!eventFire) {           
                varA = currNum.textContent;
            }
            if (eventFire) {
                placeHolder.textContent = "";
                varB = currNum.textContent;
                allowChangeOper = true;
                evalMode = false;
            }
        }
    }
}

numberButton.addEventListener("click", addNumber);

// select the decimal button
const decimal = document.querySelector("#dot");

function addDecimal (event) {
    currNum.textContent += ".";
    decimal.removeEventListener("click", addDecimal);
}

decimal.addEventListener("click", addDecimal);

// select the operation section without the '=' sign
const operation = document.querySelector(".operations-buttons");

let placeholderOperation = document.createElement("h4");
placeholderOperation.setAttribute("class", "number-to-be-added");
let gtPlaceholderOp = document.createElement("h4");
gtPlaceholderOp.setAttribute("class", "number-to-be-added");

let varA = "";
let varB = "";
let currOper = "";
let prevOper = "";

function processOperation (event) {
    let condition = (event.target.className !== "operations-buttons" && event.target.id !== "evaluate");
    let target = event.target.textContent;;

    if (condition && evalMode) {
        gtPlaceholderOp.textContent = result + " " + target;
        grandTotal.replaceWith(gtPlaceholderOp);
        currNum.textContent = "";
        placeHolder.textContent = result;
        currOper = target;
    }
    if (condition && !evalMode) {
        if (varA === "") {
            console.log("enter number first blin");
        }  else {
            eventFire = true; 
            if (currOper) {
                prevOper = currOper;
            }
            currOper = target;         
            currNum.replaceWith(placeHolder);
            currNum.textContent = "";
            if (!result) {
                placeHolder.textContent = varA;
                result = varA;
            }
            if (allowChangeOper) {
                switch (prevOper) {
                    case "+":
                        result = (parseFloat(varA) + parseFloat(varB));
                        varA = result;
                        break;
                    case "-":
                        result = (parseFloat(varA) - parseFloat(varB));
                        varA = result;
                        break;
                    case "x":
                        result = (parseFloat(varA) * parseFloat(varB));
                        varA = result;
                        break;
                    case "/":
                        result = (parseFloat(varA) / parseFloat(varB));
                        varA = result;
                        break;                        
                } 
                placeHolder.textContent = result;
            }
            console.log(parseFloat(varA) + parseFloat(varB));
            allowChangeOper = false;
            placeholderOperation.textContent = result + " " + target;
            toBeAdded.appendChild(placeholderOperation);
            gtPlaceholderOp.replaceWith(placeholderOperation); // just in case if the code above does not work ;) shitty ass implementation be like
        }
    }
    decimal.addEventListener("click", addDecimal)
};
operation.addEventListener("click", processOperation);


// select the evaluate button
let grandTotal = document.createElement("h4");
grandTotal.setAttribute("class", "number-to-be-added");
let evalMode = false;

const evaluate = document.querySelector("#evaluate");

function evaluateProcess (event) {
    
    if (event.target.id == "evaluate") {
        if (!varB) {
            console.error("enter number first blin");
        };
        grandTotal.textContent = result + " " + currOper + " "+ varB + " = ";
        toBeAdded.replaceWith(grandTotal);
        gtPlaceholderOp.replaceWith(grandTotal); // also this just in case if the code above does not work ;) what's wrong with me with this ahh
        switch (currOper) {
            case "+":
                result = (parseFloat(varA) + parseFloat(varB));
                currNum.textContent = result;
                varA = result;
                break;
            case "-":
                result = (parseFloat(varA) - parseFloat(varB));
                currNum.textContent = result;
                varA = result;
                break;
            case "x":
                result = (parseFloat(varA) * parseFloat(varB));
                currNum.textContent = result;
                varA = result;
                break;
            case "/":
                result = (parseFloat(varA) / parseFloat(varB));
                currNum.textContent = result;
                varA = result;
                break;
        }
        evalMode = true;
    }
};

// select the delete and clear button
const deleteButton = document.querySelector(".erase-buttons");

deleteButton.addEventListener("click", (event) => {
    if (event.target.id == "clear") {
        currNum.textContent = "";
    }
    if (event.target.id == "erase") {
        console.log("Not yet implemented");
    }
});

evaluate.addEventListener("click", evaluateProcess);

