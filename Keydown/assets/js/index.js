var eAlert = document.querySelector(".alert");
var eBox = document.querySelector(".box");
var eResult = document.querySelector(".result");
var eKey = document.querySelector(".card.key p:last-child");
var eLocation = document.querySelector(".card.location p:last-child");
var eWhich = document.querySelector(".card.which p:last-child");
var eCode = document.querySelector(".card.code p:last-child");


document.addEventListener("keydown", (e) => {
    eResult.innerText = e.which;
    eLocation.innerText = e.which;
    eCode.innerText = e.code;
    eKey.innerText = e.code;
    eAlert.classList.add("hide");
    eBox.classList.remove("hide");
})