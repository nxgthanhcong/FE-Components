var images = document.querySelectorAll(".image img");
var btnClose = document.querySelector(".gallery .close");
var btnPrev = document.querySelector(".gallery .prev");
var btnNext = document.querySelector(".gallery .next");
var innerImage = document.querySelector(".gallery__inner img");
var gallery = document.querySelector(".gallery");

var currentIndex = 0;

function showGallery() {
    if (currentIndex === 0) {
        btnPrev.classList.add("hide")
    } else {
        btnPrev.classList.remove("hide")
    }
    if (currentIndex === images.length - 1) {
        btnNext.classList.add("hide")
    } else {
        btnNext.classList.remove("hide")
    }
    //display
    innerImage.src = images[currentIndex].src;
    gallery.classList.add("show");
}

images.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentIndex = index;
        showGallery();
    })
})

btnClose.addEventListener("click", () => {
    gallery.classList.remove("show");
})

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        gallery.classList.remove("show");
    }
})

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37) {
        prevImage();
    }
})

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 39) {
        nextImage();
    }
})

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        showGallery();
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        showGallery();
    }
}

btnPrev.addEventListener("click", prevImage)

btnNext.addEventListener("click", nextImage)