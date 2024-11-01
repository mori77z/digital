// Select images and create a zoom container
const images = document.querySelectorAll(".img-container img");
const zoomedContainer = document.createElement("div");
const zoomedImage = document.createElement("img");

zoomedContainer.classList.add("zoomed-container");
zoomedImage.classList.add("zoomed-image");
zoomedContainer.appendChild(zoomedImage);
document.body.appendChild(zoomedContainer);

// Function to open zoomed image
function openZoomedImage(src) {
    zoomedImage.src = src;
    zoomedImage.classList.add("active"); // Hinzufügen der aktiven Klasse für Animation
    zoomedContainer.classList.add("active");
}

// Function to close zoomed image
function closeZoomedImage() {
    zoomedImage.classList.remove("active"); // Entfernen der aktiven Klasse
    zoomedContainer.classList.remove("active");
}

// Add event listeners to images to open in zoom
images.forEach((img) => {
    img.addEventListener("click", () => {
        openZoomedImage(img.src);
    });
});

// Close zoomed image when clicking outside the image
zoomedContainer.addEventListener("click", (e) => {
    if (e.target === zoomedContainer || e.target === zoomedImage) {
        closeZoomedImage();
    }
});

// Arrow scroll functionality for left/right arrows outside the carousel
const arrowLeft = document.querySelectorAll(".arrow_left");
const arrowRight = document.querySelectorAll(".arrow_right");

arrowLeft.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });
});

arrowRight.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});

// Der Binärcode für "Tuttofare"
const binaryCode = "01010100 01110101 01110100 01110100 01101111 01100110 01100001 01110010 01100101"; 
const finalText = "binary for Tuttofare (ital. Jack of all Trades)"; // Der finale Text

// Anzeigetafel für den Binärcode erstellen
const board = document.getElementById('board');
const finalTextDiv = document.getElementById('finalText');

// Funktion zum Umschalten der Klappenanimation für den Binärcode
function flipFlaps(text) {
    // Vorhandene Inhalte entfernen
    board.innerHTML = '';
    
    text.split("").forEach((char) => {
        const flap = document.createElement("div");
        flap.classList.add("flap");
        flap.dataset.char = char;
        flap.innerText = char; // Text auf dem Flap setzen
        board.appendChild(flap);
        
        // Animation hinzufügen
        setTimeout(() => {
            flap.classList.add("flip");
            setTimeout(() => flap.classList.remove("flip"), 300);
        }, 100); // Verzögerung für die Animation
    });
}

// Funktion zum Anzeigen des endgültigen Textes
function showFinalText() {
    board.style.display = 'none'; // Anzeigetafel ausblenden
    finalTextDiv.innerText = finalText; // Finalen Text setzen
    finalTextDiv.style.display = 'block'; // Finalen Text anzeigen
}

// Startanimation
flipFlaps(binaryCode); // Binärcode anzeigen

// Wechsel zwischen Binärcode und endgültigem Text alle 10 Sekunden
setInterval(() => {
    if (board.innerHTML) {
        showFinalText();
    } else {
        board.style.display = 'flex'; // Anzeigetafel wieder anzeigen
        finalTextDiv.style.display = 'none'; // Finalen Text ausblenden
        flipFlaps(binaryCode);
    }
}, 10000); // Alle 10 Sekunden

// Optional: Bei Klick auf die Anzeigetafel die Animation sofort auslösen
board.addEventListener("click", () => {
    flipFlaps(binaryCode);
});
