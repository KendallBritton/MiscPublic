const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');

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
    const noLabel = document.getElementById('no-label');
    const submitButton = document.getElementById('submit-button');
    const yesCheckbox = document.querySelector('input[value="yes"]');
    const noCheckbox = document.querySelector('input[value="no"]');

    if (selectedValue === 'yes' && yesCheckbox.checked) {
        noLabel.style.display = 'none'; // Hide "No" checkbox
        submitButton.style.display = 'block'; // Show the Submit button
    } else if (selectedValue === 'no' && noCheckbox.checked) {
        yesLabel.style.display = 'none'; // Hide "Yes" checkbox
        submitButton.style.display = 'block'; // Show the Submit button
    } else {
        // Re-enable both checkboxes if unselected
        yesLabel.style.display = 'inline-block';
        noLabel.style.display = 'inline-block';
        submitButton.style.display = 'none'; // Hide the Submit button
    }
}

// Function to handle the submit button
function handleSubmit() {

    alert('Form submitted!'); // Placeholder for form submission logic
}

// Initially hide the sidebar
document.querySelector('.sidebar').classList.add('locked-sidebar');
document.querySelector('.sidebar-toggle').classList.add('locked-sidebar');

// Enable sidebar on submit
document.getElementById('submit-button').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('locked-sidebar');
    document.querySelector('.sidebar-toggle').classList.remove('locked-sidebar');
});