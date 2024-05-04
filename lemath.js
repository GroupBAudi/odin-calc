let screen = document.querySelector(".screen");

let currNum = document.querySelector(".current-number");
let placeHolder = document.createElement("h1");
let toBeAdded = document.querySelector(".number-to-be-added");
let history = document.createElement("p")

toBeAdded.textContent = "";

const numberButton = document.querySelector(".numbers-buttons");
const operationsButton = document.querySelector(".operations-buttons");


let result;
let eventFire = false;

numberButton.addEventListener("click", (event) => {
    if (event.target.className !== "numbers-buttons") {
        currNum.textContent += event.target.textContent;
        screen.appendChild(currNum);
        if (!eventFire) {           
            varA = currNum.textContent;
            if (placeHolder) {
                placeHolder.textContent = "";
            }
        }
        if (eventFire) {
            varB = currNum.textContent;
            placeHolder.textContent = "";
        }
    }
})  

/* add decimal feature */

const operation = document.querySelector(".operations-buttons");

let varA = "";
let varB = "";
let currOper = "";
let prevOper = "";


operation.addEventListener("click", function operation (event) {
    if (event.target.className !== "operations-buttons" && event.target.id !== "evaluate") {
            toBeAdded.textContent += currNum.textContent + " " + event.target.textContent + " ";
            eventFire = true;
            screen.appendChild(toBeAdded);
            if (currOper) {
                prevOper = currOper;
            }
            currOper = event.target.textContent;         
            screen.replaceChild(placeHolder, currNum);
            currNum.textContent = "";
            if (varA && varB && prevOper) {
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
            }
            placeHolder.textContent = varA;
    }
    if (event.target.id == "evaluate") {
        switch (currOper) {
            case "+":
                result = parseInt(varA) + parseInt(varB);
                toBeAdded.textContent += currNum.textContent ;
                currNum.textContent = result;
                break;
            case "-":
                result = parseInt(varA) - parseInt(varB);
                toBeAdded.textContent += currNum.textContent ;
                currNum.textContent = result;
                break;
            case "*":
                console.log("eval timee")
                result = parseInt(varA) * parseInt(varB);
                toBeAdded.textContent += currNum.textContent ;
                currNum.textContent = result;
                break;
            case "/":
                console.log("eval timee")
                result = parseInt(varA) / parseInt(varB);
                toBeAdded.textContent += currNum.textContent ;
                currNum.textContent = result;
                break;
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

