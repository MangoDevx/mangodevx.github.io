var socialMediaButtons = document.getElementsByClassName('social');
var modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
})
var modalLabel = document.getElementById('modalLabel');

function init() {
    for(let i = 0; i < socialMediaButtons.length; i++) {
        let button = socialMediaButtons[i];
        button.addEventListener("click", () => {
            showModal(button.innerHTML + ' ' + button.id);
        });
    }
}

function showModal(socialName) {
    event.preventDefault();
    modalLabel.innerHTML = socialName;
    modal.show();
}