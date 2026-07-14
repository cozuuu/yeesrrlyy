// ==========================================
// NOTEBOOK SYSTEM
// ==========================================

let currentSpread = 1;
let totalSpreads = 0;

function openNotebook() {
    const notebook = document.getElementById("notebook");
    notebook.classList.add("opened");
    
    // Dynamically query total spreads upon opening
    totalSpreads = document.querySelectorAll(".spread").length;
    showSpread(1);
}

function showSpread(number) {
    const spreads = document.querySelectorAll(".spread");

    spreads.forEach(spread => {
        spread.classList.remove("active");
    });

    const target = document.getElementById("spread" + number);

    if (target) {
        target.classList.add("active");
        currentSpread = number;
    }
}

function nextSpread() {
    if (currentSpread < totalSpreads) {
        showSpread(currentSpread + 1);
    }
}

function prevSpread() {
    if (currentSpread > 1) {
        showSpread(currentSpread - 1);
    }
}

function resetNotebook() {
    currentSpread = 1;
    showSpread(1);
}

// ==========================================
// CONSTELLATION CONVERGENCE ANIMATION
// ==========================================

function pullConstellation(value) {
    const p = value / 100; // Percentage multiplier (0.00 to 1.00)
    const message = document.getElementById("starMessage");
    const nextButton = document.getElementById("starNext");
    const centerStar = document.getElementById("star-center");

    // Predefined baseline scattered coordinates [Top %, Left %] for the 6 stars
    const initialPositions = [
        { t: 20, l: 15 }, // star1
        { t: 35, l: 30 }, // star2
        { t: 15, l: 75 }, // star3
        { t: 40, l: 90 }, // star4
        { t: 65, l: 20 }, // star5
        { t: 70, l: 70 }  // star6
    ];

    // Perfect structural focus point inside the space container
    const targetT = 45;
    const targetL = 50;

    // Linearly move every star towards the center target coordinate as the slider updates
    initialPositions.forEach((pos, index) => {
        const star = document.getElementById("star" + (index + 1));
        if (star) {
            let currentT = pos.t + (targetT - pos.t) * p;
            let currentL = pos.l + (targetL - pos.l) * p;
            
            star.style.top = currentT + "%";
            star.style.left = currentL + "%";
            
            // Add custom scale down transformation as they blend together
            star.style.transform = `scale(${1 - p * 0.3})`;
        }
    });

    // Toggle interactive milestone triggers once stars are fully grouped
    if (value >= 98) {
        message.innerText = '"Distance never changed where home was."';
        message.style.opacity = "1";
        if (centerStar) {
            centerStar.style.transform = "translate(-50%, -50%) scale(1.5)";
            centerStar.style.opacity = "1";
        }
        if (nextButton) nextButton.style.display = "inline-block";
    } else {
        message.innerText = '"Bring the stars back together..."';
        message.style.opacity = 0.3 + (p * 0.5);
        if (centerStar) {
            centerStar.style.transform = "translate(-50%, -50%) scale(0)";
            centerStar.style.opacity = "0";
        }
        if (nextButton) nextButton.style.display = "none";
    }
}

// ==========================================
// BIRTHDAY WRAPPER / ENVELOPE INTERACTION
// ==========================================

function openLetter() {
    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter");

    if (envelope) envelope.style.display = "none";
    if (letter) letter.style.display = "block";
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener("keydown", function (event) {
    // Escape action out if notebook isn't active
    if (!document.getElementById("notebook")?.classList.contains("opened")) return;

    if (event.key === "ArrowRight") {
        nextSpread();
    }

    if (event.key === "ArrowLeft") {
        prevSpread();
    }
});
