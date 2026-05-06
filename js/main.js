import { Calculator } from "./calculator.js";

const calc = new Calculator();

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const toggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);
toggle.checked = savedTheme === "dark";

toggle.addEventListener("change", () => {
  const isDark = toggle.checked;

  document.body.classList.remove("light", "dark");
  document.body.classList.add(isDark ? "dark" : "light");

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

function autoResizeDisplay() {
  display.style.height = "auto";

  const maxHeight = 140;
  const newHeight = display.scrollHeight;

  if (newHeight < maxHeight) {
    display.style.height = newHeight + "px";
    display.style.overflowY = "hidden";
  } else {
    display.style.height = maxHeight + "px";
    display.style.overflowY = "auto";
  }
}

function updateDisplay(value) {
  display.textContent = value;
  autoResizeDisplay();
}

function safeCalculate() {
  try {
    const result = calc.calculate();

    if (
      !result ||
      typeof result === "function" ||
      result.toString().includes("Error")
    ) {
      updateDisplay("Плак плак");
      return;
    }

    updateDisplay(result);

  } catch (e) {
    updateDisplay("Плак плак");
  }
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;

    if (btn.id === "clear") {
      calc.clear();
      updateDisplay("0");
      return;
    }

    if (btn.id === "backspace") {
      calc.expression = calc.expression.slice(0, -1);
      updateDisplay(calc.getDisplay());
      return;
    }

    if (btn.id === "equals") {
      safeCalculate();
      return;
    }

    if (value) {
      calc.add(value);
      updateDisplay(calc.getDisplay());
    }
  });
});

updateDisplay("0");