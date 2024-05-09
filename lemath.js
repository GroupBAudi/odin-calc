let screen = document.querySelector(".screen");
let currNum = document.querySelector(".current-number");
let placeHolder = document.createElement("h1");
let toBeAdded = document.querySelector(".number-to-be-added");
let history = document.createElement("p")

const numberButton = document.querySelector(".numbers-buttons");
const operationsButton = document.querySelector(".operations-buttons");

let result;
let eventFire = false;
let allowChangeOper = false;

toBeAdded.textContent = "";

numberButton.addEventListener("click", (event) => {
    if (event.target.className !== "numbers-buttons") {
        if ((event.target.textContent == "0" || event.target.textContent == "00" )&& !currNum.textContent) {
            console.error("enter number first blin");
        } else  {
            currNum.textContent += event.target.textContent;
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
});

/* add decimal feature */

const operation = document.querySelector(".operations-buttons");

let varA = "";
let varB = "";
let currOper = "";
let prevOper = "";

let placeholderOperation = document.createElement("h4");
placeholderOperation.setAttribute("class", "number-to-be-added");
let gtPlaceholderOp = document.createElement("h4");
gtPlaceholderOp.setAttribute("class", "number-to-be-added");

operation.addEventListener("click", function operation (event) {
    let condition = (event.target.className !== "operations-buttons" && event.target.id !== "evaluate");

    if (condition && evalMode) {
        console.log("this one should fires");
        gtPlaceholderOp.textContent = result + " " + event.target.textContent; 
        grandTotal.replaceWith(gtPlaceholderOp);
        currNum.textContent = "";
        placeHolder.textContent = result;
    }
    if (condition && !evalMode) {
        console.log("this shouldn't fire");
        if (varA === "") {
            console.log("enter number first blin");
        }  else {
                eventFire = true;
                
                if (currOper) {
                    prevOper = currOper;
                    // console.log(`prevOper = ${prevOper}`);
                }
                currOper = event.target.textContent;         
                currNum.replaceWith(placeHolder);
                currNum.textContent = "";
                if (!result) {
                    placeHolder.textContent = varA;
                    result = varA;
                }
                placeholderOperation.textContent = varA + " " + event.target.textContent + " ";
                if (allowChangeOper) {
                    switch (prevOper) {
                        case "+":
                            result = parseFloat(varA) + parseFloat(varB);
                            varA = result;
                            break;
                        case "-":
                            result = parseFloat(varA) - parseFloat(varB);
                            varA = result;
                            break;
                        case "x":
                            result = parseFloat(varA) * parseFloat(varB);
                            varA = result;
                            break;
                        case "/":
                            result = parseFloat(varA) / parseFloat(varB);
                            varA = result;
                            break;                        
                    } 
                    placeHolder.textContent = result;
                }
                allowChangeOper = false;
                placeholderOperation.textContent = result + " "+ event.target.textContent;
                
                
                toBeAdded.appendChild(placeholderOperation);
                gtPlaceholderOp.replaceWith(placeholderOperation); // just in case if the code above does not work ;) shitty ass implementation be like
            }
        }
})

let grandTotal = document.createElement("h4");
grandTotal.setAttribute("class", "number-to-be-added");
let evalMode = false;

const evaluate = document.querySelector("#evaluate");
evaluate.addEventListener("click", function evaluate (event) {
    if (event.target.id == "evaluate") {
        grandTotal.textContent = result + " " + currOper + " "+ varB + " = ";
        toBeAdded.replaceWith(grandTotal);
        gtPlaceholderOp.replaceWith(grandTotal); // also this just in case if the code above does not work ;) what's wrong with me with this ahh
        switch (currOper) {
            case "+":
                result = parseInt(varA) + parseInt(varB);
                currNum.textContent = result;
                varA = result;
                break;
            case "-":
                result = parseInt(varA) - parseInt(varB);
                currNum.textContent = result;
                varA = result;
                break;
            case "x":
                result = parseInt(varA) * parseInt(varB);
                currNum.textContent = result;
                varA = result;
                break;
            case "/":
                result = parseInt(varA) / parseInt(varB);
                currNum.textContent = result;
                varA = result;
                break;
        }
        evalMode = true;
    }
});

const deleteButton = document.querySelector(".erase-buttons");

deleteButton.addEventListener("click", (event) => {
    if (event.target.id == "clear") {
        currNum.textContent = "";
    }
    if (event.target.id == "erase") {
        console.log("Not yet implemented");
    }
});

