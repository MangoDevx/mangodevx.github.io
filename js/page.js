var picture = document.getElementsByClassName('headshot')[0];

function bounce() {
    picture.addEventListener("click", () => {
        bouncePicture();
    });
}

function bouncePicture() {
    picture.classList.add('bounce');
    setTimeout(() => { picture.classList.remove('bounce'); }, 1000);
}