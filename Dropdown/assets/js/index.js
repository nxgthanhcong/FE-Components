var eDropdownSelectedItem = document.querySelector(".dropdown__item--selected");
var eDropdown = document.querySelector(".dropdown");
var eDropdownItems = document.querySelectorAll(".dropdown__item");

eDropdownSelectedItem.addEventListener("click", () => {
    eDropdown.classList.toggle("active");
})

eDropdownItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        eDropdownSelectedItem.innerHTML = item.innerHTML;
        eDropdown.classList.remove("active");
    })
})