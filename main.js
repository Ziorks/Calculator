let now = new Date();
document.querySelector("#time").innerHTML =
  (now.getHours() % 12) + ":" + ("0" + now.getMinutes()).slice(-2);
setInterval(() => {
  let now = new Date();
  document.querySelector("#time").innerHTML =
    (now.getHours() % 12) + ":" + ("0" + now.getMinutes()).slice(-2);
}, 5000);

let screenValue = "0";
let storedValue = "";
let operator = "";
let readout = document.querySelector("#readout");
let zero = document.getElementById("0");
let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let four = document.getElementById("4");
let five = document.getElementById("5");
let six = document.getElementById("6");
let seven = document.getElementById("7");
let eight = document.getElementById("8");
let nine = document.getElementById("9");
let dot = document.getElementById(".");
let equals = document.getElementById("equals");
let sign = document.getElementById("sign");
let divide = document.getElementById("divide");
let clear = document.getElementById("clear");
let percent = document.getElementById("percent");
let add = document.getElementById("add");
let subtract = document.getElementById("subtract");
let multiply = document.getElementById("multiply");

function calculate() {
  let result = 0;

  switch (operator) {
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

zero.addEventListener("click", (e) => {
  if (screenValue != "0") {
    screenValue += "0";
  }
  readout.innerHTML = screenValue;
});

one.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "1") : (screenValue += "1");
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

two.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "2") : (screenValue += "2");
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

three.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "3") : (screenValue += "3");
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

four.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "4") : (screenValue += "4");
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

five.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "5") : (screenValue += "5");
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

six.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "6") : (screenValue += "6");
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

seven.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "7") : (screenValue += "7");
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

eight.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "8") : (screenValue += "8");
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

nine.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "9") : (screenValue += "9");
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

dot.addEventListener("click", (e) => {
  if (screenValue == "0") {
    screenValue = "0.";
  } else if (!screenValue.includes(".")) {
    screenValue += ".";
  }
  readout.innerHTML = screenValue;
  clear.innerHTML = "C";
});

clear.addEventListener("click", (e) => {
  if (clear.innerHTML == "C") {
    screenValue = "0";
    clear.innerHTML = "AC";
  } else {
    screenValue = "0";
    storedValue = "";
  }
  readout.innerHTML = screenValue;
});

sign.addEventListener("click", (e) => {
  screenValue = (-parseFloat(screenValue)).toString();
  readout.innerHTML = screenValue;
});

percent.addEventListener("click", (e) => {
  screenValue = (parseFloat(screenValue) / 100).toString();
  readout.innerHTML = screenValue;
});

add.addEventListener("click", (e) => {
  operator = "add";
  calculate();
  screenValue = "0";
});

subtract.addEventListener("click", (e) => {
  operator = "subtract";
  calculate();
  screenValue = "0";
});

multiply.addEventListener("click", (e) => {
  operator = "multiply";
  calculate();
  screenValue = "0";
});

divide.addEventListener("click", (e) => {
  operator = "divide";
  calculate();
  screenValue = "0";
});

equals.addEventListener("click", (e) => {
  calculate();
});
