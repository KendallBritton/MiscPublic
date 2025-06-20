const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');

checkSubmissionMap = localStorage.getItem("responseSubmissionMap");
const obtainCurrentUser = localStorage.getItem("currentUserAccessName");

// Initially hide the sidebar
document.querySelector('.sidebar').classList.add('locked-sidebar');
document.querySelector('.sidebar-toggle').classList.add('locked-sidebar');

// Restores state if user has previoulsy submitted response
if (checkSubmissionMap != null && checkSubmissionMap.includes(obtainCurrentUser)){
    if (document.getElementById("checkbox-section")) {
        document.getElementById("checkbox-section").remove();
    }
    
    if (document.getElementById("submit-button")) {
        document.getElementById("submit-button").remove();
    }
    
    // Enable the sidebar
    document.querySelector('.sidebar').classList.remove('locked-sidebar');
    document.querySelector('.sidebar-toggle').classList.remove('locked-sidebar');

}

// Function to toggle the sidebar
function toggleSidebar() {
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-230px'; // Hide sidebar
    } else {
        sidebar.style.left = '0px'; // Show sidebar
    }
    sidebarToggle.style.display = 'none'; // Hide the button when sidebar is open
}

// Event listener for mouse leave to close the sidebar
sidebar.addEventListener('mouseleave', function() {
    sidebar.style.left = '-230px'; // Hide sidebar when mouse leaves
    sidebarToggle.style.display = 'block'; // Show the button again
});

// Event listener for clicks outside the sidebar
document.addEventListener('click', function(event) {
    if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
        sidebar.style.left = '-230px'; // Hide sidebar
        sidebarToggle.style.display = 'block'; // Show the button again
    }
});

// Right arrow to proceed to next page
document.getElementById("show-next-page2").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".container").style.display = "none";
    document.querySelector(".container2").style.display = "flex"; // Show container2
});

document.getElementById("show-next-page3").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".container2").style.display = "none";
    document.querySelector(".container3").style.display = "flex"; // Show container3
});

document.getElementById("show-next-page4").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".container3").style.display = "none";
        document.querySelector(".container4").style.display = "flex"; // Show container4
});

// Left arrow to proceed to previous page
document.getElementById("show-previous-page1").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".container").style.display = "flex";
    document.querySelector(".container2").style.display = "none"; // Show container
});

document.getElementById("show-previous-page2").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".container2").style.display = "flex";
    document.querySelector(".container3").style.display = "none"; // Show container2
});


document.getElementById("show-previous-page3").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".container3").style.display = "flex";
    document.querySelector(".container4").style.display = "none"; // Show container3
});

// Function to handle the check box
function handleCheckboxClick(selectedValue) {
    const yesLabel = document.getElementById('yes-label');
    const submitButton = document.getElementById('submit-button');
    const yesCheckbox = document.querySelector('input[value="yes"]');

    if (selectedValue === 'yes' && yesCheckbox.checked) {
        submitButton.style.display = 'block'; // Show the Submit button
    } else {
        // Re-enable both checkboxes if unselected
        yesLabel.style.display = 'inline-block';
        submitButton.style.display = 'none'; // Hide the Submit button
    }
}


// Response Submit Logic
if (document.getElementById("submit-button")) {

    document.getElementById('submit-button').addEventListener('click', () => {

        alert('Thank you so much! \n\nThis is where the fun starts!! \n\nThe menu button is now unlocked so go check out whose in the rest of the party! \n\nSorry this took my so long. I made this all from scratch and I\'m a perfectionist.'); // Placeholder for form submission logic


        // Uncomment the following lines to enable email sending functionality

        emailjs.send('service_9d5sj9h', 'template_hx7gpm7', {
                subject: 'Update From Your Groomsmen Web Service',
                message: localStorage.getItem("currentUserAccessName") + ' has chosen to be a groomsmen!',
        })
        .then(response => {
            console.log("Email sent successfully!", response);

        })
        .catch(error => {
            console.error("Failed to send email:", error);

            // Show an error message (optional)
            alert("There was an error submitting your response. Please try again.");
        });


        // Retrieve the existing map from localStorage
        let savedMapArray = JSON.parse(localStorage.getItem("responseSubmissionMap")) || [];
        let responseSubmissionMap = new Map(savedMapArray);

        // Add the current user to the Map
        responseSubmissionMap.set(localStorage.getItem("currentUserAccessName"), "Response Submitted");

        // Convert the updated Map to an array and save it to localStorage
        localStorage.setItem("responseSubmissionMap", JSON.stringify(Array.from(responseSubmissionMap.entries())));


        // Enable the sidebar
        document.querySelector('.sidebar').classList.remove('locked-sidebar');
        document.querySelector('.sidebar-toggle').classList.remove('locked-sidebar');

        // Remove the checkboxes and submit button
        document.getElementById("checkbox-section").remove();
        document.getElementById("submit-button").remove();

    });
}

// Calculate the height of the parallax item and set it as a CSS variable
document.addEventListener("DOMContentLoaded", () => {
    const parallaxItem = document.querySelector(".parallax-item");
    const parallaxContainer = document.querySelector(".parallax-container");

    document.querySelector(".container2").style.display = "flex"; 

    if (parallaxItem && parallaxContainer) {
        // Get the height of a single parallax-item
        const itemHeight = parallaxItem.offsetHeight;

        // Set the height as a CSS variable on the parallax-container
        parallaxContainer.style.setProperty("--parallax-item-height", `${itemHeight}px`);

        // Calculate the distance between the parallax container and the top of the first parallax-item
        const containerRect = parallaxContainer.getBoundingClientRect();
        const itemRect = parallaxItem.getBoundingClientRect();
        const distanceFromTop = itemRect.top - containerRect.top;
        const distanceFromBottom = containerRect.top - itemRect.bottom;

        console.log("Distance from parallax container to first parallax item:", distanceFromTop);
        console.log("Distance from parallax container to bottom of first parallax item:", distanceFromBottom);

        // Optionally, set this distance as a CSS variable
        parallaxContainer.style.setProperty("--parallax-item-offset", `${distanceFromTop}px`);
    } else {
        console.error("Parallax item or container not found.");
    }

    document.querySelector(".container2").style.display = "none"; 
});

function calculateAverageGradientColor() {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = 100;
    canvas.height = 100;

    // Draw the gradient on the canvas
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#a0522d"); // First color
    gradient.addColorStop(0.33, "#deb887"); // Second color
    gradient.addColorStop(0.66, "#8b4513"); // Third color
    gradient.addColorStop(1, "#f4a460"); // Fourth color
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get pixel data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Calculate the average color
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < pixels.length; i += 4) {
        r += pixels[i];     // Red
        g += pixels[i + 1]; // Green
        b += pixels[i + 2]; // Blue
    }
    const pixelCount = pixels.length / 4;
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    // Set the body's background color to the average color
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", calculateAverageGradientColor);

// Add event listeners to all sidebar links to set a parameter in sessionStorage
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {

        e.preventDefault(); // Prevent default navigation

        // Sets link context to load the correct profile page
        const firstName = this.textContent.trim().split(' ')[0];
        sessionStorage.setItem('profileTravelTo', firstName);

        // Now manually navigate to the link's href
        window.location.href = "../WebpageLayouts/loadingScreen.html";

    });
});

document.querySelectorAll('.parallax-item').forEach(item => {
    const bg = item.querySelector('.bg-video');
    const fg = item.querySelector('.fg-video');

    if (bg && fg) {
        // Sync play/pause
        fg.addEventListener('play', () => { if (bg.paused) bg.play(); });
        fg.addEventListener('pause', () => { if (!bg.paused) bg.pause(); });

        // Sync seeking
        fg.addEventListener('seeked', () => { bg.currentTime = fg.currentTime; });
        fg.addEventListener('timeupdate', () => {
            // Periodically sync to avoid drift
            if (Math.abs(bg.currentTime - fg.currentTime) > 0.1) {
                bg.currentTime = fg.currentTime;
            }
        });

        // Optional: sync bg to fg on load
        fg.addEventListener('loadedmetadata', () => { bg.currentTime = fg.currentTime; });
    }
});

function pauseOffscreenVideos() {
    document.querySelectorAll('.container2 parallax-item').forEach(video => {
        const rect = video.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            video.pause();
        } else if (video.paused) {
            video.play();
        }
    });
}
window.addEventListener('scroll', pauseOffscreenVideos);
window.addEventListener('resize', pauseOffscreenVideos);
document.addEventListener('DOMContentLoaded', pauseOffscreenVideos);