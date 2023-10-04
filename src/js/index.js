/* ------- GET ELEMENTS & CREATE VARIABLES ------------ */
const screen = document.querySelector(".screen");
const operatorButtons = document.querySelectorAll(".calc-button");
const numButtons = document.querySelectorAll(".num-button");
const otherButtons = document.querySelectorAll(".other-button");
const colorThemes = document.querySelectorAll(`[name = "theme"]`);

let currentInput = "";
let previousInput = 0;
let previousOperator = "";
let resultOnScreen = false;
/* -------------------------------------------------- */

/* ---------------- HANDLE CALCULATOR ---------------- */

//Step 1: handle numeric & operator buttons, update numbers in screen
numButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (resultOnScreen) {
      currentInput = "";
      resultOnScreen = false;
    }

    currentInput += event.target.textContent;
    updateScreen(currentInput);
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (resultOnScreen) {
      resultOnScreen = false;
    }

    if (previousInput !== 0 && currentInput !== "") {
      calculate();
    }

    previousInput = parseFloat(currentInput);
    previousOperator = event.target.textContent;
    currentInput = "";
  });
});

//Step 2: handle other buttons: AC, +/-, %, =
//AC
otherButtons[0].addEventListener("click", () => {
  currentInput = "";
  previousInput = 0;
  previousOperator = "";
  resultOnScreen = false;
  updateScreen(previousInput);
});
// +/-
otherButtons[1].addEventListener("click", () => {
  currentInput = (parseFloat(currentInput) * -1).toString();

  updateScreen(currentInput);
});
// %
otherButtons[2].addEventListener("click", () => {
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateScreen(currentInput);
});
// =
otherButtons[3].addEventListener("click", () => {
  calculate();
  previousOperator = "";
});

function calculate() {
  let calcResult;

  switch (previousOperator) {
    case "+":
      calcResult = previousInput + parseFloat(currentInput);
      break;
    case "−":
      calcResult = previousInput - parseFloat(currentInput);
      break;
    case "×":
      calcResult = previousInput * parseFloat(currentInput);
      break;
    case "÷":
      calcResult = previousInput / parseFloat(currentInput);
      break;
    default:
      return;
  }

  calcResult = parseFloat(calcResult.toFixed(14));
  currentInput = calcResult.toString();

  updateScreen(currentInput);
  resultOnScreen = true;
}

//Step 3: update screen
function updateScreen(value) {
  screen.textContent = value;
}
/* --------------------------------------------------- */

/* ------------------ HANDLE THEME ------------------- */
function storeTheme(theme) {
  localStorage.setItem("theme", theme);
}
function getTheme() {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
}
//save chosen theme
colorThemes.forEach((option) => {
  option.addEventListener("click", () => {
    storeTheme(option.id);
  });
});
//get/apply chosen theme when page reload
document.onload = getTheme();
/* ------------------------------------------------ */

/* 
  //in function: fallback for no :has() support
  document.documentElement.className = theme; 
*/
