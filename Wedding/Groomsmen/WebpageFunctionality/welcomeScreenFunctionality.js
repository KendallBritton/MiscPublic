// Create the grid container
const gridContainer = document.createElement('div');
gridContainer.style.position = 'fixed';
gridContainer.style.top = '0';
gridContainer.style.left = '0';
gridContainer.style.width = '400%'; // Full viewport width
gridContainer.style.height = '400%'; // Full viewport height
gridContainer.style.display = 'grid';
gridContainer.style.zIndex = '-1'; // Place behind all content
gridContainer.style.gap = '0'; // Remove spacing between grid cells
gridContainer.style.transition = 'grid-template-columns 0.2s, grid-template-rows 0.2s'; // Smooth transition for grid resizing
gridContainer.style.overflow = 'hidden'; // Hide overflowing blocks

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

    // Set the background color of the body to the average color of all columns
    document.body.style.backgroundColor = calculateAverageColor(columnColors);

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

    // Update the body background color to the average of the column colors
    document.body.style.backgroundColor = calculateAverageColor(columnColors);
}

function calculateAverageColor(colors) {
    let totalR = 0, totalG = 0, totalB = 0;

    colors.forEach(color => {
        const rgb = color.match(/\d+/g); // Extract RGB values from the color string
        totalR += parseInt(rgb[0]);
        totalG += parseInt(rgb[1]);
        totalB += parseInt(rgb[2]);
    });

    const avgR = Math.floor(totalR / colors.length);
    const avgG = Math.floor(totalG / colors.length);
    const avgB = Math.floor(totalB / colors.length);

    return `rgb(${avgR}, ${avgG}, ${avgB})`;
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

// Function to check orientation and toggle fullscreen
function handleOrientationChange() {
    if (window.innerWidth > window.innerHeight) {
        // Landscape mode: Request fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // For Safari
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // For IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // Portrait mode: Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // For Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // For IE/Edge
            document.msExitFullscreen();
        }
    }
}

// Listen for orientation changes
window.addEventListener("resize", handleOrientationChange);

// Call the function initially to handle the current orientation
handleOrientationChange();