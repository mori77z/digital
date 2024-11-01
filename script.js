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
    zoomedImage.classList.add("active"); // Adding active class for animation
    zoomedContainer.classList.add("active");
}

// Function to close zoomed image
function closeZoomedImage() {
    zoomedImage.classList.remove("active"); // Removing active class
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

// JavaScript for Animation Logic
const binaryString = "01010101 01101110 01100101 01101100 01101100 01100001 01101101";
const explanationText = "Binary for Tuttofare (ital. Jack of all Trades)";

const board = document.getElementById("board");
const explanation = document.getElementById("explanationText");

// Function to create flaps with binary characters
function createFlaps(text) {
    if (!board) return; // Ensure board exists
    board.innerHTML = ""; // Clear the board
    text.split("").forEach(char => {
        const flap = document.createElement("span");
        flap.classList.add("flap");
        flap.setAttribute("data-char", char);
        flap.textContent = char; // Set the character for the flap
        board.appendChild(flap);
    });
}

// Function to start the flipping animation
function startFlipAnimation() {
    if (!board || !explanation) return; // Ensure elements exist
    createFlaps(binaryString);

    [...board.children].forEach((flap, index) => {
        setTimeout(() => {
            flap.classList.add("flip");
            setTimeout(() => {
                // After flip animation completes, show the character
                flap.textContent = flap.getAttribute("data-char"); // Ensure the correct character is displayed
                // Display explanation text after all flips
                if (index === board.children.length - 1) {
                    board.style.display = "none"; // Hide the board
                    explanation.style.display = "block"; // Show the explanation text

                    // Revert back to initial state after 6 seconds
                    setTimeout(() => {
                        explanation.style.display = "none"; // Hide explanation
                        board.style.display = "flex"; // Show board again
                        createFlaps(binaryString); // Recreate flaps
                    }, 6000);
                }
            }, 100);
        }, index * 80); // Slightly slower timing
    });
}

// Restart animation on scrolling down from top
let isScrolling = false; // Debounce scrolling to prevent repeated calls

window.addEventListener("scroll", () => {
    if (!isScrolling && window.scrollY === 0) {
        isScrolling = true;
        startFlipAnimation();
        setTimeout(() => { isScrolling = false; }, 500); // Allow a delay before re-triggering
    }
});

// Initial load animation
startFlipAnimation();