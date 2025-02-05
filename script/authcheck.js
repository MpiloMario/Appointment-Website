document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in (assuming a token is stored in localStorage)
    const userToken = localStorage.getItem("userToken"); 

    if (!userToken) {
        // If no token found, redirect to login page
        window.location.href = "user.html";
    }
});
