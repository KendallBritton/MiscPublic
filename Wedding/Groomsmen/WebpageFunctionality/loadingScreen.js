document.addEventListener("DOMContentLoaded", () => {
    // Your existing loadingScreen.js code
    const currentUserName = localStorage.getItem("currentUserAccessName");

    const loadOtherUserProfile = sessionStorage.getItem("profileTravelTo");

    // Get the video source element
    const videoSource = document.getElementById("videoSource");
    const backgroundVideo = document.getElementById("backgroundVideo");

    // Function to determine the video source
    function getVideoSource(currentUserName, loadOtherUserProfile) {
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

        if (loadOtherUserProfile) {
            // If navigating to another user's profile, use the video for that user
            return videoMap[loadOtherUserProfile]; // Fallback to default video
        }

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
    const videoSrc = getVideoSource(currentUserName, loadOtherUserProfile);
    videoSource.src = videoSrc;
    
    if (loadOtherUserProfile) {

        // Set the body background image from the videoStillMap
        videoStillSrc = videoStillMap[loadOtherUserProfile] || "../Images/Default-Still.jpg"; // Fallback to a default still image
        document.body.style.setProperty("--background-image", `url('${videoStillSrc}')`);

    } else {

        // Set the body background image from the videoStillMap
        videoStillSrc = videoStillMap[currentUserName] || "../Images/Default-Still.jpg"; // Fallback to a default still image
        document.body.style.setProperty("--background-image", `url('${videoStillSrc}')`);

    }
        

    // Set the poster attribute for the video
    backgroundVideo.poster = videoStillSrc;

    // Reload the video to apply the new source
    backgroundVideo.load();

});


// Map names to video sources
const profileMap = {
    "Chris": "../WebpageLayouts/profileScreenChris.html",
    "Jalen": "../WebpageLayouts/profileScreenJalen.html",
    "Jeremiah": "../WebpageLayouts/profileScreenJeremiah.html",
    "Kaleb": "../WebpageLayouts/profileScreenKaleb.html",
    "Kayno": "../WebpageLayouts/profileScreenKayno.html",
    "Ryan": "../WebpageLayouts/profileScreenRyan.html",
    "Terrell": "../WebpageLayouts/profileScreenTerrell.html",
    "Ty": "../WebpageLayouts/profileScreenTy.html",
};

// Remove the loop attribute for the first playthrough
backgroundVideo.removeAttribute("loop");

// Add an event listener for when the video ends
backgroundVideo.addEventListener("ended", () => {

    const loadOtherUserProfile = sessionStorage.getItem("profileTravelTo");

    if (loadOtherUserProfile) {

        sessionStorage.removeItem('profileTravelTo'); // Clear previous profile context

        // Redirect to the other user page
        window.location.href = profileMap[loadOtherUserProfile]; // Replace with your target page

    } else {

        // Redirect to the user's own page
        window.location.href = profileMap[localStorage.getItem("currentUserAccessName")]; // Replace with your target page

    }

});