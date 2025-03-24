// Create the grid container
const gridContainer = document.createElement('div');
gridContainer.style.position = 'fixed';
gridContainer.style.top = '0';
gridContainer.style.left = '0';
gridContainer.style.width = '100vw'; // Full viewport width
gridContainer.style.height = '100vh'; // Full viewport height
gridContainer.style.display = 'grid';
gridContainer.style.zIndex = '-1'; // Place behind all content
gridContainer.style.gap = '0'; // Remove spacing between grid cells
gridContainer.style.transition = 'grid-template-columns 0.2s, grid-template-rows 0.2s'; // Smooth transition for grid resizing

document.body.appendChild(gridContainer);

// Function to populate the grid with blocks
function createGrid() {
    const blockSize = Math.floor(window.innerWidth / Math.ceil(window.innerWidth / 100)); // Calculate block size based on viewport width
    const cols = Math.ceil(window.innerWidth / blockSize); // Number of columns (based on width)
    const rows = Math.ceil(window.innerHeight / blockSize); // Number of rows (based on height)

    // Adjust grid template to fit the full screen width and height
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${blockSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${blockSize}px)`;

    // Update the grid cells' size and colors without recreating them
    const blocks = gridContainer.children;
    const columnColors = Array.from({ length: cols }, getRandomColor);

    let blockIndex = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let block;
            if (blockIndex < blocks.length) {
                block = blocks[blockIndex];
            } else {
                block = document.createElement('div');
                block.style.width = '100%';
                block.style.height = '100%';
                block.style.transition = 'background-color 1s ease'; // Smooth color transitions
                gridContainer.appendChild(block);
            }
            block.style.backgroundColor = columnColors[col]; // Assign color based on column
            blockIndex++;
        }
    }

    // Remove extra blocks if the number of cells has decreased
    while (blockIndex < blocks.length) {
        gridContainer.removeChild(blocks[blockIndex]);
    }
}

// Function to generate a slight shade of brown
function getRandomColor() {
    const r = Math.floor(Math.random() * (150) + 100); // Red: typically between 100-250
    const g = Math.floor(Math.random() * (100) + 50);  // Green: typically between 50-150
    const b = Math.floor(Math.random() * (80) + 20);   // Blue: typically between 20-100
    
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to update block colors column-wise
function updateColors() {
    const blockSize = Math.floor(window.innerWidth / Math.ceil(window.innerWidth / 100)); // Calculate block size based on viewport width
    const cols = Math.ceil(window.innerWidth / blockSize); // Number of columns (based on width)
    const columnColors = Array.from({ length: cols }, getRandomColor); // New colors for each column

    const blocks = gridContainer.children;

    Array.from(blocks).forEach((block, index) => {
        const col = index % cols; // Determine column based on index
        block.style.backgroundColor = columnColors[col];
    });
}

// To handle smooth resizing and prevent glitches
let resizeRequested = false;

function handleResize() {
    if (!resizeRequested) {
        resizeRequested = true;
        // Use requestAnimationFrame to ensure smooth resizing
        requestAnimationFrame(() => {
            createGrid(); // Adjust grid layout after resizing
            resizeRequested = false; // Reset the resize flag after the update
        });
    }
}

// Redraw grid on resize, with smooth performance
window.addEventListener('resize', handleResize);

// Initialize the grid and start the animation
createGrid();
setInterval(updateColors, 3000); // Update colors every 3 seconds

// The rest of your JavaScript logic for the form and validation
const validNames = ["TERRELL BRITTON", "RYAN DAVENPORT", "KALEB CODY", "KAYNO SPEIGHTS", "TY WILSON", "JEREMIAH STRINGFIELD", "JALEN GOODWIN", "CHRIS MCCLURKIN"]; // Predefined list of names

function checkName() {
    const nameInput = document.getElementById("nameInput").value.trim().toUpperCase();
    const message = document.getElementById("message");

    if (validNames.includes(nameInput)) {
  
        firstName = nameInput.split(" ")[0]
        firstName = firstName.toLowerCase();
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        
        message.innerHTML = `<strong style='color: green;'>Access Granted</strong><br><br><span style='color: black;'>Welcome ${firstName}!</span>`;

        // Save the name to localStorage when submitted on the welcome page
        const userName = firstName;
        if (userName) {
            localStorage.setItem("currentUserAccessName", userName);
        }
        
        // Start the countdown
        startCountdown(10); // 10 seconds countdown


    } else {
        message.style.color = "red";
        message.textContent = "Access denied. User has not been granted access.";
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkName();
    }
}

function startCountdown(seconds) {
    var countdown = document.getElementById("countdown");
    countdown.style.display = "block"; // Show the countdown element
    var countdownTimer = setInterval(function() {
        countdown.innerHTML = "Redirecting in: " + seconds + " seconds";
        if (seconds <= 0) {
            clearInterval(countdownTimer);
            countdown.style.display = "none"; // Hide countdown when done
            window.location.href = "./WebpageLayouts/profileScreen.html"; // Redirect to another webpage
        }
        seconds--;
    }, 1000);
}