document.addEventListener("DOMContentLoaded", () => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
        console.warn("No user token found! Redirecting to login...");
        window.location.href = "user.html"; // Redirect to login
    } else {
        console.log("User is authenticated, access granted.");
    }
});
