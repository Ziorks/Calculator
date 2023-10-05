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
let memoryValue = "";
let operationValue = "";
let inputting = false;
let operationState = false;
let activeOperator = null;

let regex = /\d/g;

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
  const scrnum = parseFloat(screenValue);
  const memnum = parseFloat(memoryValue);
  const opnum = parseFloat(operationValue);
  switch (activeOperator) {
    case "add":
      if (memoryValue == "") {
        return (scrnum + opnum).toString();
      } else {
        return (memnum + opnum).toString();
      }
    case "multiply":
      if (memoryValue == "") {
        return (scrnum * opnum).toString();
      } else {
        return (memnum * opnum).toString();
      }
    case "subtract":
      if (memoryValue == "") {
        return (scrnum - opnum).toString();
      } else {
        return (memnum - opnum).toString();
      }
    case "divide":
      if (memoryValue == "") {
        return (scrnum / opnum).toString();
      } else {
        return (memnum / opnum).toString();
      }
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
  inputting = true;
  uncolorActiveOperator();
}

function pressDigit(digit) {
  if (!inputting || screenValue == "0") {
    screenValue = `${digit}`;
  } else if (screenValue.match(regex).length < 9) {
    screenValue += `${digit}`;
  }
  update();
  clear.innerHTML = "C";
}

function press0() {
  if (!inputting) {
    screenValue = "0";
    clear.innerHTML = "C";
  } else if (screenValue != "0" && screenValue.match(regex).length < 9) {
    screenValue += "0";
  }
  update();
}

function pressDot() {
  if (!inputting || screenValue == "0") {
    screenValue = "0.";
  } else if (
    !screenValue.includes(".") &&
    screenValue.match(regex).length < 9
  ) {
    screenValue += ".";
  }
  update();
  clear.innerHTML = "C";
}

function pressClear() {
  if (clear.innerHTML == "C") {
    clear.innerHTML = "AC";
    inputting = true;
  } else {
    memoryValue = "";
    operationValue = "";
    uncolorActiveOperator();
    activeOperator = null;
    inputting = false;
  }
  screenValue = "0";
  readout.innerHTML = screenValue;
}

function pressOperator(operator) {
  const op = operators[operator];
  uncolorActiveOperator();
  op.style.backgroundColor = "white";
  op.style.color = "orange";
  if (!operationState) {
    memoryValue = screenValue;
  }
  if (inputting) {
    pressEquals();
    inputting = false;
  }
  activeOperator = operator;
  operationState = true;
}

function pressEquals() {
  if (activeOperator) {
    if (inputting || memoryValue != "") {
      if (operationState) {
        operationValue = screenValue;
      }
    }
    screenValue = calculate();
    readout.innerHTML = screenValue;
    memoryValue = "";
    inputting = false;
    operationState = false;
    uncolorActiveOperator();
  }
}

function digitMouseOver(e) {
  e.style.transition = "all 0s";
  e.style.backgroundColor = "rgb(99, 98, 98)";
}

function digitMouseLeave(e) {
  e.style.transition = "all 800ms ease-out";
  e.style.backgroundColor = "rgb(41, 41, 41)";
}

function specialMouseOver(e) {
  e.style.transition = "all 0s";
  e.style.backgroundColor = "rgb(204, 202, 202)";
}

function specialMouseLeave(e) {
  e.style.transition = "all 800ms ease-out";
  e.style.backgroundColor = "rgb(148, 147, 147)";
}

function operatorMouseOver(e) {
  e.style.transition = "all 0s";
  e.style.backgroundColor = "rgb(255, 212, 133)";
}

function operatorMouseLeave(e) {
  e.style.transition = "all 800ms ease-out";
  if (e.style.color == "orange") {
    e.style.backgroundColor = "white";
  } else {
    e.style.backgroundColor = "orange";
  }
}

//zero key events
digits[0].addEventListener("click", (e) => {
  press0();
});

digits[0].addEventListener("mouseover", (e) => {
  digitMouseOver(digits[0]);
});

digits[0].addEventListener("mouseleave", (e) => {
  digitMouseLeave(digits[0]);
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Numpad0" || e.code == "Digit0") {
    press0();
    digitMouseOver(digits[0]);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code == "Numpad0" || e.code == "Digit0") {
    digitMouseLeave(digits[0]);
  }
});

//1-9 key events
for (let i = 1; i < 10; i++) {
  digits[i].addEventListener("click", (e) => {
    pressDigit(i);
  });

  digits[i].addEventListener("mouseover", (e) => {
    digitMouseOver(digits[i]);
  });

  digits[i].addEventListener("mouseleave", (e) => {
    digitMouseLeave(digits[i]);
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Numpad" + `${i}` || e.code == "Digit" + `${i}`) {
      pressDigit(i);
      digitMouseOver(digits[i]);
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.code == "Numpad" + `${i}` || e.code == "Digit" + `${i}`) {
      digitMouseLeave(digits[i]);
    }
  });
}

//. key events
dot.addEventListener("click", (e) => {
  pressDot();
});

dot.addEventListener("mouseover", (e) => {
  digitMouseOver(dot);
});

dot.addEventListener("mouseleave", (e) => {
  digitMouseLeave(dot);
});

document.addEventListener("keydown", (e) => {
  if (e.code == "NumpadDecimal" || e.code == "Period") {
    pressDot();
    digitMouseOver(dot);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code == "NumpadDecimal" || e.code == "Period") {
    digitMouseLeave(dot);
  }
});

//clear key events
clear.addEventListener("click", (e) => {
  pressClear();
});

clear.addEventListener("mouseover", (e) => {
  specialMouseOver(clear);
});

clear.addEventListener("mouseleave", (e) => {
  specialMouseLeave(clear);
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Delete") {
    pressClear();
    specialMouseOver(clear);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code == "Delete") {
    specialMouseLeave(clear);
  }
});

//switch sign key events
sign.addEventListener("click", (e) => {
  screenValue = (-parseFloat(screenValue)).toString();
  readout.innerHTML = screenValue;
});

sign.addEventListener("mouseover", (e) => {
  specialMouseOver(sign);
});

sign.addEventListener("mouseleave", (e) => {
  specialMouseLeave(sign);
});

//percent key events
percent.addEventListener("click", (e) => {
  screenValue = (parseFloat(screenValue) / 100).toString();
  readout.innerHTML = screenValue;
});

percent.addEventListener("mouseover", (e) => {
  specialMouseOver(percent);
});

percent.addEventListener("mouseleave", (e) => {
  specialMouseLeave(percent);
});

//operator key events
for (const operator in operators) {
  const op = operators[operator];

  op.addEventListener("click", (e) => {
    op.style.transition = "all 0s";
    pressOperator(operator);
  });

  op.addEventListener("mouseover", (e) => {
    operatorMouseOver(op);
  });

  op.addEventListener("mouseleave", (e) => {
    operatorMouseLeave(op);
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

//equals key events
equals.addEventListener("click", (e) => {
  pressEquals();
});

equals.addEventListener("mouseover", (e) => {
  operatorMouseOver(equals);
});

equals.addEventListener("mouseleave", (e) => {
  operatorMouseLeave(equals);
});

document.addEventListener("keydown", (e) => {
  if (e.code == "NumpadEnter" || e.code == "Enter") {
    pressEquals();
    operatorMouseOver(equals);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code == "NumpadEnter" || e.code == "Enter") {
    operatorMouseLeave(equals);
  }
});
