document.addEventListener("DOMContentLoaded", () => {
    // Your existing loadingScreen.js code
    const currentUserName = localStorage.getItem("currentUserAccessName");

    // Get the video source element
    const videoSource = document.getElementById("videoSource");
    const backgroundVideo = document.getElementById("backgroundVideo");

    // Function to determine the video source
    function getVideoSource(currentUserName) {
        const videoMap = {
            "Chris": "../Images/Chris/Chris-Loading-Screen.mov",
            "Jalen": "../Images/Jalen/Jalen-Loading-Screen.mov",
            "Jeremiah": "../Images/Jeremiah/Jeremiah-Loading-Screen.mov",
            "Kaleb": "../Images/Kaleb/Kaleb-Loading-Screen.mov",
            "Kayno": "../Images/Kayno/Kayno-Loading-Screen.mov",
            "Ryan": "../Images/Ryan/Ryan-Loading-Screen.mov",
            "Terrell": "../Images/Terrell/Terrell-Loading-Screen.mov",
            "Ty": "../Images/Ty/Ty-Loading-Screen.mov",
        };

        return videoMap[currentUserName] || "../Videos/Default-Video.mp4"; // Fallback to default video
    }

    // Set the video still sources based on the current user's name
    const videoStillMap = {
        "Chris": "../Images/Chris/Chris-Still.png",
        "Jalen": "../Images/Jalen/Jalen-Still.png",
        "Jeremiah": "../Images/Jeremiah/Jeremiah-Still.png",
        "Kaleb": "../Images/Kaleb/Kaleb-Still.png",
        "Kayno": "../Images/Kayno/Kayno-Still.png",
        "Ryan": "../Images/Ryan/Ryan-Still.png",
        "Terrell": "../Images/Terrell/Terrell-Still.png",
        "Ty": "../Images/Ty/Ty-Still.png",
    };

    // Populate the video source
    const videoSrc = getVideoSource(currentUserName);
    videoSource.src = videoSrc;

    // Set the body background image from the videoStillMap
    const videoStillSrc = videoStillMap[currentUserName] || "../Images/Default-Still.jpg"; // Fallback to a default still image
    document.body.style.setProperty("--background-image", `url('${videoStillSrc}')`);


    // Reload the video to apply the new source
    backgroundVideo.load();

});


// Map names to video sources
const profileMap = {
    "Chris": "../WebpageLayouts/profileScreen.html",
    "Jalen": "../WebpageLayouts/profileScreen.html",
    "Jeremiah": "../WebpageLayouts/profileScreen.html",
    "Kaleb": "../WebpageLayouts/profileScreen.html",
    "Kayno": "../WebpageLayouts/profileScreen.html",
    "Ryan": "../WebpageLayouts/profileScreen.html",
    "Terrell": "../WebpageLayouts/profileScreen.html",
    "Ty": "../WebpageLayouts/profileScreen.html",
};

// Remove the loop attribute for the first playthrough
backgroundVideo.removeAttribute("loop");

// Add an event listener for when the video ends
backgroundVideo.addEventListener("ended", () => {
    // Redirect to the new page
    window.location.href = profileMap[localStorage.getItem("currentUserAccessName")]; // Replace with your target page
});