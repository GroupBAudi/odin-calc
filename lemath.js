let screen = document.querySelector(".calc-screen");

const numberButton = document.querySelector(".numbers-buttons");

let varA = document.createElement("p");
let numA = "";
let operations = "";
let numB = ""
numberButton.addEventListener("click", (event) => {
    if (event.target.className == "calc-button") {
        numA += event.target.textContent;
        varA.textContent += event.target.textContent
        screen.appendChild(varA);
        console.log(varA);
    }
})

const operationsButton = document.querySelector(".operations-buttons");

operationsButton.addEventListener("click", (event) => {
    if (event.target.className == "calc-button" || event.target.className == "calc-button big") {
        console.log(event.target.textContent);
    }
})


