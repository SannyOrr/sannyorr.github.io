const card = document.getElementById("card");
const cardImage = document.getElementById("card-image");
const message = document.getElementById("message");

let currentPage = 1;
const totalPages = 21;
let isChanging = false;

card.addEventListener("click", function() {
    if (isChanging) return;
    if (currentPage >= totalPages) currentPage=0;

    isChanging = true;

    // Animate current image out
    cardImage.classList.add("changing");

    setTimeout(function() {
        currentPage++;

        // Change image
        cardImage.src = `images/page-${currentPage}.jpg`;

        // Animate new image in
        setTimeout(function() {
            cardImage.classList.remove("changing");
            isChanging = false;

            if (currentPage === totalPages) {
                message.textContent = "";
            }
        }, 50);

    }, 350);
});