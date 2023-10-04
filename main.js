const updateTime = () => {
  let now = new Date();
  document.querySelector("#time").innerHTML =
    (now.getHours() % 12) + ":" + ("0" + now.getMinutes()).slice(-2);
};
updateTime();
setInterval(updateTime, 5000);

let buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].style.transition = "all 800ms ease-out";
}

let screenValue = "0";
let storedValue = "0";
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
  switch (activeOperator) {
    case "add":
      return (parseFloat(screenValue) + parseFloat(storedValue)).toString();
    case "subtract":
      return (parseFloat(screenValue) - parseFloat(storedValue)).toString();
    case "multiply":
      return (parseFloat(screenValue) * parseFloat(storedValue)).toString();
    case "divide":
      return (parseFloat(screenValue) / parseFloat(storedValue)).toString();
  }
}

function uncolorActiveOperator() {
  if (activeOperator != null) {
    operators[activeOperator].style.backgroundColor = "orange";
    operators[activeOperator].style.color = "white";
  }
}

function update() {
  readout.innerHTML = screenValue;
  displayingResult = false;
  uncolorActiveOperator();
}

function pressDigit(digit) {
  if (displayingResult || screenValue == "0") {
    screenValue = `${digit}`;
  } else {
    screenValue += `${digit}`;
  }
  update();
  clear.innerHTML = "C";
}

function press0() {
  if (displayingResult) {
    screenValue = "0";
  } else if (screenValue != "0") {
    screenValue += "0";
  }
  update();
}

function pressDot() {
  if (displayingResult || screenValue == "0") {
    screenValue = "0.";
  } else if (!screenValue.includes(".")) {
    screenValue += ".";
  }
  update();
  clear.innerHTML = "C";
}

function pressClear() {
  if (clear.innerHTML == "C") {
    clear.innerHTML = "AC";
    displayingResult = false;
  } else {
    storedValue = "0";
    uncolorActiveOperator();
    activeOperator = null;
    displayingResult = true;
  }
  screenValue = "0";
  readout.innerHTML = screenValue;
}

function pressOperator(operator) {
  const op = operators[operator];
  uncolorActiveOperator();
  op.style.backgroundColor = "white";
  op.style.color = "orange";
  let temp = screenValue;
  if (!displayingResult) {
    pressEquals();
    storedValue = temp;
    displayingResult = true;
  }
  activeOperator = operator;
}

function pressEquals() {
  if (activeOperator != null) {
    screenValue = calculate();
    readout.innerHTML = screenValue;
    uncolorActiveOperator();
    displayingResult = true;
  }
}

digits[0].addEventListener("click", (e) => {
  press0();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Numpad0" || e.code == "Digit0") {
    press0();
    digits[0].style.transition = "all 0s";
    digits[0].style.backgroundColor = "rgb(99, 98, 98)";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code == "Numpad0" || e.code == "Digit0") {
    digits[0].style.transition = "all 800ms ease-out";
    digits[0].style.backgroundColor = "rgb(41, 41, 41)";
  }
});

for (let i = 1; i < 10; i++) {
  digits[i].addEventListener("click", (e) => {
    pressDigit(i);
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Numpad" + `${i}` || e.code == "Digit" + `${i}`) {
      pressDigit(i);
      digits[i].style.transition = "all 0s";
      digits[i].style.backgroundColor = "rgb(99, 98, 98)";
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.code == "Numpad" + `${i}` || e.code == "Digit" + `${i}`) {
      digits[i].style.transition = "all 800ms ease-out";
      digits[i].style.backgroundColor = "rgb(41, 41, 41)";
    }
  });
}

dot.addEventListener("click", (e) => {
  pressDot();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "NumpadDecimal" || e.code == "Period") {
    pressDot();
    dot.style.transition = "all 0s";
    dot.style.backgroundColor = "rgb(99, 98, 98)";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code == "NumpadDecimal" || e.code == "Period") {
    dot.style.transition = "all 800ms ease-out";
    dot.style.backgroundColor = "rgb(41, 41, 41)";
  }
});

clear.addEventListener("click", (e) => {
  pressClear();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Delete") {
    pressClear();
    clear.style.transition = "all 0s";
    clear.style.backgroundColor = "rgb(204, 202, 202)";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code == "Delete") {
    clear.style.transition = "all 800ms ease-out";
    clear.style.backgroundColor = "rgb(148, 147, 147)";
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
    op.style.transition = "all 0s";
    pressOperator(operator);
  });
  op.addEventListener("mouseover", (e) => {
    op.style.backgroundColor = "rgb(255, 212, 133)";
  });
  op.addEventListener("mouseleave", (e) => {
    op.style.transition = "all 800ms ease-out";
    if (op.style.color == "orange") {
      op.style.backgroundColor = "white";
    } else {
      op.style.backgroundColor = "orange";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code.toLocaleLowerCase() == "numpad" + `${operator}`) {
      op.style.transition = "all 0s";
      pressOperator(operator);
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.code.toLocaleLowerCase() == "numpad" + `${operator}`) {
      op.style.transition = "all 800ms ease-out";
    }
  });
}

equals.addEventListener("click", (e) => {
  pressEquals();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "NumpadEnter" || e.code == "Enter") {
    pressEquals();
    equals.style.transition = "all 0s";
    equals.style.backgroundColor = "rgb(255, 212, 133)";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code == "NumpadEnter" || e.code == "Enter") {
    equals.style.transition = "all 800ms ease-out";
    equals.style.backgroundColor = "orange";
  }
});
