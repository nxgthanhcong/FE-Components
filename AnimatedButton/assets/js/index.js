var btnOpenModal = document.querySelector(".btn-open-modal");
var btnClose = document.querySelector(".modal__footer button");
var iconClose = document.querySelector(".modal__header i");
var modal = document.querySelector(".modal");

function toggleModal() {
    modal.classList.toggle("hide");
}

btnOpenModal.addEventListener("click", toggleModal);
btnClose.addEventListener("click", toggleModal);
iconClose.addEventListener("click", toggleModal);
modal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget)
        toggleModal();
});

