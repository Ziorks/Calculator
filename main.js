let now = new Date;
document.querySelector("#time").innerHTML = now.getHours() % 12 + ":" + ('0' + now.getMinutes()).slice(-2);
setInterval( () => {
    let now = new Date;
    document.querySelector("#time").innerHTML = now.getHours() % 12 + ":" + ('0' + now.getMinutes()).slice(-2);
}, 5000);