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
    zoomedImage.classList.add("active"); // Add active class for animation
    zoomedContainer.classList.add("active");
}

// Function to close zoomed image
function closeZoomedImage() {
    zoomedImage.classList.remove("active"); // Remove active class
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

// The binary code for "Tuttofare"
const binaryCode = "01010100 01110101 01110100 01110100 01101111 01100110 01100001 01110010 01100101"; 
const finalText = "binary for Tuttofare (ital. Jack of all Trades)"; // The final text

// Create display board for the binary code
const board = document.getElementById('board');
const finalTextDiv = document.getElementById('finalText');

// Function to toggle the flap animation for binary code
function flipFlaps(text) {
    // Clear previous content
    board.innerHTML = '';
    
    text.split("").forEach((char) => {
        const flap = document.createElement("div");
        flap.classList.add("flap");
        flap.dataset.char = char;
        flap.innerText = char; // Set text on the flap
        board.appendChild(flap);
        
        // Add animation
        setTimeout(() => {
            flap.classList.add("flip");
            setTimeout(() => flap.classList.remove("flip"), 300);
        }, 100); // Delay for the animation
    });
}

// Function to display the final text
function showFinalText() {
    board.style.display = 'none'; // Hide the board
    finalTextDiv.innerText = finalText; // Set final text
    finalTextDiv.style.display = 'block'; // Show final text
}

// Start the animation
flipFlaps(binaryCode); // Show binary code

// Switch between binary code and final text every 10 seconds
setInterval(() => {
    if (board.innerHTML) {
        showFinalText();
    } else {
        board.style.display = 'flex'; // Show the board again
        finalTextDiv.style.display = 'none'; // Hide final text
        flipFlaps(binaryCode); // Show binary code again
    }
}, 10000); // Every 10 seconds

// Optional: Trigger the animation immediately on board click
board.addEventListener("click", () => {
    flipFlaps(binaryCode);
});
