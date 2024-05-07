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
            console.log("enter number first blin");
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

operation.addEventListener("click", function operation (event) {
    if (event.target.className !== "operations-buttons" && event.target.id !== "evaluate") {
        if (varA === "") {
            console.log("enter number first blin");
        } 
            eventFire = true;
            placeholderOperation.textContent = varA + " " + event.target.textContent + " ";
            toBeAdded.appendChild(placeholderOperation);
            if (currOper) {
                prevOper = currOper;
                console.log(prevOper);
            }
            currOper = event.target.textContent;         
            currNum.replaceWith(placeHolder);
            currNum.textContent = "";
            if (!result) {
                placeHolder.textContent = varA;
                result = varA;
            }
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
                console.log("this one fires");
                placeHolder.textContent = result;
            }
            allowChangeOper = false;
            placeholderOperation.textContent = result + " "+ event.target.textContent;
    }
})

let grandTotal = document.createElement("h4");
let counter = 0;
const evaluate = document.querySelector("#evaluate");
evaluate.addEventListener("click", function evaluate (event) {
    if (event.target.id == "evaluate") {
        if (!counter) {
            grandTotal.textContent = toBeAdded.textContent + currNum.textContent + " = ";
            toBeAdded.replaceWith(grandTotal);
            switch (currOper) {
                case "+":
                    result = parseInt(varA) + parseInt(varB);
                    currNum.textContent = result;
                    counter++;
                    break;
                case "-":
                    result = parseInt(varA) - parseInt(varB);
                    currNum.textContent = result;
                    break;
                case "x":
                    result = parseInt(varA) * parseInt(varB);
                    currNum.textContent = result;
                    break;
                case "/":
                    result = parseInt(varA) / parseInt(varB);
                    currNum.textContent = result;
                    break;
            }
        } else {    
            switch (currOper) {
                case "+":
                    result = result + parseInt(varB);
                    currNum.textContent = result;
                    counter++;
                    break;
                case "-":
                    result = parseInt(varA) - parseInt(varB);
                    currNum.textContent = result;
                    break;
                case "x":
                    result = parseInt(varA) * parseInt(varB);
                    currNum.textContent = result;
                    break;
                case "/":
                    result = parseInt(varA) / parseInt(varB);
                    currNum.textContent = result;
                    break;
            }
        }
    }
    
})


const deleteButton = document.querySelector(".erase-buttons");

deleteButton.addEventListener("click", (event) => {
    if (event.target.id == "clear") {
        currNum.textContent = "";
    }
    if (event.target.id == "erase") {
        console.log("Not yet implemented");
    }
})

