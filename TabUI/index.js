var eTabItems = document.querySelectorAll(".tab-item");
var eTabPanes = document.querySelectorAll(".tab-pane");

const eActiveTab = document.querySelector(".tab-item.active");
const eActiveTabLine = document.querySelector(".tabs .line");

eActiveTabLine.style.width = eActiveTab.offsetWidth + "px";
eActiveTabLine.style.left = eActiveTab.offsetLeft + "px";

eTabItems.forEach((item, index) => {
    var currentTabPane = eTabPanes[index];
    item.onclick = function () {
        document.querySelector(".tab-item.active").classList.remove("active");
        document.querySelector(".tab-pane.active").classList.remove("active");

        eActiveTabLine.style.left = this.offsetLeft + "px";
        eActiveTabLine.style.width = this.offsetWidth + "px";

        item.classList.add("active");
        currentTabPane.classList.add("active");
    }
})
