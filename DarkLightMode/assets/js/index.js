const eBody = document.querySelector("body");
const eControl = document.querySelector(".control");

eControl.addEventListener("click", () => {
    eBody.classList.toggle("light");
})