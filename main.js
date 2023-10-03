let now = new Date();
document.querySelector("#time").innerHTML =
  (now.getHours() % 12) + ":" + ("0" + now.getMinutes()).slice(-2);
setInterval(() => {
  let now = new Date();
  document.querySelector("#time").innerHTML =
    (now.getHours() % 12) + ":" + ("0" + now.getMinutes()).slice(-2);
}, 5000);

let screenValue = "0";
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
let clear = document.getElementById("clear");

zero.addEventListener("click", (e) => {
  if (screenValue != "0") {
    screenValue += "0";
  }
  readout.innerHTML = screenValue;
});

one.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "1") : (screenValue += "1");
  readout.innerHTML = screenValue;
});

two.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "2") : (screenValue += "2");
  readout.innerHTML = screenValue;
});

three.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "3") : (screenValue += "3");
  readout.innerHTML = screenValue;
});

four.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "4") : (screenValue += "4");
  readout.innerHTML = screenValue;
});

five.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "5") : (screenValue += "5");
  readout.innerHTML = screenValue;
});

six.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "6") : (screenValue += "6");
  readout.innerHTML = screenValue;
});

seven.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "7") : (screenValue += "7");
  readout.innerHTML = screenValue;
});

eight.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "8") : (screenValue += "8");
  readout.innerHTML = screenValue;
});

nine.addEventListener("click", (e) => {
  screenValue == "0" ? (screenValue = "9") : (screenValue += "9");
  readout.innerHTML = screenValue;
});

clear.addEventListener("click", (e) => {
  screenValue = "0";
  readout.innerHTML = screenValue;
});
