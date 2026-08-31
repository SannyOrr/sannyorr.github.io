const pageCursors = {
    1: "Z",
    2: "Z",
    13: "pizza",
    14: "harry",
    15: "josh",
    16: "josh",
    17: "prem",
    18: "tomato",
    19: "donut",
    20: "Z"
};

function updateCursor(page) {

    document.body.classList.remove(
        "cursor-donut",
        "cursor-harry",
        "cursor-josh",
        "cursor-pizza",
        "cursor-prem",
        "cursor-tomato",
    );

    if (pageCursors[page] === "pizza") {
        document.body.classList.add("cursor-pizza");
    }
    
    if (pageCursors[page] === "donut") {
        document.body.classList.add("cursor-donut");
    }

    if (pageCursors[page] === "harry") {
        document.body.classList.add("cursor-harry");
    }
    
    if (pageCursors[page] === "josh") {
        document.body.classList.add("cursor-josh");
    }

    if (pageCursors[page] === "prem") {
        document.body.classList.add("cursor-prem");
    }

    if (pageCursors[page] === "donut") {
        document.body.classList.add("cursor-donut");
    }
    if (pageCursors[page] === "tomato") {
        document.body.classList.add("cursor-tomato");
    }
}

const fireworkPages = [2, 10, 20, 22];
const fireworksCanvas = document.getElementById("fireworks");
const ctx = fireworksCanvas.getContext("2d");

let particles = [];
let fireworksActive = false;

// Resize canvas to fill screen
function resizeCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// Create one firework explosion
function createFirework(x, y) {

    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;

        particles.push({
            x: x,
            y: y,

            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,

            life: 100,

            size: Math.random() * 3 + 1
        });
    }
}


// Update and draw particles
function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        fireworksCanvas.width,
        fireworksCanvas.height
    );

    particles.forEach(function(particle, index) {

        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        // Gravity
        particle.velocityY += 0.05;

        particle.life--;

        ctx.globalAlpha = particle.life / 100;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "orange";
        ctx.fill();

        // Remove dead particles
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    ctx.globalAlpha = 1;

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

const card = document.getElementById("card");
const cardImage = document.getElementById("card-image");
const message = document.getElementById("message");
const music = document.getElementById("music");


let currentPage = 0;
const totalPages = 22;
let isChanging = false;

const pageMusic = {
    1: "audio/page-1.mp3",
    2: "audio/page-2.mp3",
    3: "audio/page-2.mp3",
    4: "audio/page-4.mp3",
    5: "audio/page-4.mp3",
    6: "audio/page-4.mp3",
    7: "audio/page-4.mp3",
    8: "audio/page-4.mp3",
    9: "audio/page-4.mp3",
    10: "audio/page-4.mp3",
    11: "audio/page-harry.mp3",
    12: "audio/page-harry.mp3",
    13: "audio/page-harry.mp3",
    14: "audio/page-harry.mp3",
    15: "audio/page-bttf.mp3",
    16: "audio/page-bttf.mp3",
    17: "audio/page-bttf.mp3",
    18: "audio/page-bttf.mp3",
    19: "audio/page-bttf.mp3",
    20: "audio/page-bttf.mp3",
    21: "audio/page-billie.mp3",
    22: "audio/page-billie.mp3",
};

function updateMusic(page) {
    const newMusic = pageMusic[page];

    // If this page should use the same song already playing,
    // do nothing. The song keeps playing.
    if (music.src.includes(newMusic)) {
        return;
    }

    // Stop the old song and start the new one
    music.pause();
    music.src = newMusic;
    music.currentTime = 0;

    music.play().catch(function(error) {
        console.log("Audio could not start yet:", error);
    });
}

card.addEventListener("click", function() {
    if (isChanging) return;
    if (currentPage >= totalPages) currentPage=0;

    isChanging = true;

    // Animate current image out
    cardImage.classList.add("changing");

    setTimeout(function() {
        currentPage++;
        updateCursor(currentPage);
        cardImage.src = `images/page-${currentPage}.jpg`;

        if (fireworkPages.includes(currentPage)) {

            // Create several explosions
            createFirework(
                window.innerWidth * 0.25,
                window.innerHeight * 0.3
            );

            createFirework(
                window.innerWidth * 0.75,
                window.innerHeight * 0.25
            );

            createFirework(
                window.innerWidth * 0.5,
                window.innerHeight * 0.2
            );
        }

        updateMusic(currentPage);

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