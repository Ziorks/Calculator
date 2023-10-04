const updateTime = () => {
  let now = new Date();
  document.querySelector("#time").innerHTML =
    (now.getHours() % 12) + ":" + ("0" + now.getMinutes()).slice(-2);
};
updateTime();
setInterval(updateTime, 5000);

let screenValue = "0";
let storedValue = "";
let displayingResult = true;
let activeOperator = null;

let readout = document.querySelector("#readout");
let dot = document.getElementById(".");
let equals = document.getElementById("equals");
let sign = document.getElementById("sign");
let clear = document.getElementById("clear");
let percent = document.getElementById("percent");
let digits = [];
for (let i = 0; i < 10; i++) {
  digits.push(document.getElementById(`${i}`));
}
let operators = {
  add: document.getElementById("add"),
  subtract: document.getElementById("subtract"),
  multiply: document.getElementById("multiply"),
  divide: document.getElementById("divide"),
};

function calculate() {
  let result = 0;

  switch (activeOperator) {
    case "add":
      result = parseFloat(storedValue) + parseFloat(screenValue);
      break;
    case "subtract":
      result = parseFloat(storedValue) - parseFloat(screenValue);
      break;
    case "multiply":
      result = parseFloat(storedValue) * parseFloat(screenValue);
      break;
    case "divide":
      result = parseFloat(storedValue) / parseFloat(screenValue);
      break;
  }

  if (storedValue != "") {
    storedValue = result.toString();
    readout.innerHTML = storedValue;
  } else {
    storedValue = screenValue;
  }
}

function uncolorActiveOperator() {
  if (activeOperator != null) {
    operators[activeOperator].style.backgroundColor = "orange";
    operators[activeOperator].style.color = "white";
  }
}

function pressDigit(digit) {
  if (displayingResult) {
    screenValue = `${digit}`;
  } else {
    screenValue += `${digit}`;
  }
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
  displayingResult = false;
  uncolorActiveOperator();
}

function press0() {
  if (screenValue != "0") {
    screenValue += "0";
    displayingResult = false;
  }
  readout.innerHTML = screenValue;
  uncolorActiveOperator();
}

function pressDot() {
  if (screenValue == "0") {
    screenValue = "0.";
  } else if (!screenValue.includes(".")) {
    screenValue += ".";
  }
  displayingResult = false;
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
}

function pressClear() {
  if (clear.innerHTML == "C") {
    clear.innerHTML = "AC";
  } else {
    storedValue = "";
    uncolorActiveOperator();
    activeOperator = null;
  }
  displayingResult = true;
  screenValue = "0";
  readout.innerHTML = screenValue;
}

function pressOperator(operator) {
  const op = operators[operator];
  uncolorActiveOperator();
  op.style.backgroundColor = "white";
  op.style.color = "orange";
  activeOperator = operator;
  calculate();
  displayingResult = true;
  screenValue = "0";
}

function pressEquals() {
  calculate();
  displayingResult = true;
}

digits[0].addEventListener("click", (e) => {
  press0();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Numpad0" || e.code == "Digit0") {
    press0();
  }
});

for (let i = 1; i < 10; i++) {
  digits[i].addEventListener("click", (e) => {
    pressDigit(i);
  });
  document.addEventListener("keydown", (e) => {
    if (e.code == "Numpad" + `${i}` || e.code == "Digit" + `${i}`) {
      pressDigit(i);
    }
  });
}

dot.addEventListener("click", (e) => {
  pressDot();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "NumpadDecimal" || e.code == "Period") {
    pressDot();
  }
});

clear.addEventListener("click", (e) => {
  pressClear();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Delete") {
    pressClear();
  }
});

sign.addEventListener("click", (e) => {
  screenValue = (-parseFloat(screenValue)).toString();
  readout.innerHTML = screenValue;
});

percent.addEventListener("click", (e) => {
  screenValue = (parseFloat(screenValue) / 100).toString();
  readout.innerHTML = screenValue;
});

for (const operator in operators) {
  const op = operators[operator];
  op.addEventListener("click", (e) => {
    pressOperator(operator);
  });
  op.addEventListener("mouseover", (e) => {
    op.style.backgroundColor = "rgb(255, 212, 133)";
  });
  op.addEventListener("mouseleave", (e) => {
    if (activeOperator == operator) {
      op.style.backgroundColor = "white";
    } else {
      op.style.backgroundColor = "orange";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code.toLocaleLowerCase() == "numpad" + `${operator}`) {
      pressOperator(operator);
    }
  });
}

equals.addEventListener("click", (e) => {
  pressEquals();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "NumpadEnter" || e.code == "Enter") {
    pressEquals();
  }
});
