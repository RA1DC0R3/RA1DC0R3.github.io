// === CONFIG ===
const API_URL = "https://script.google.com/macros/s/AKfycbz2gbSeHg4-U0YbLWkukPYu1WKgzC8GW3Sf0-xL8f_rceRNLAdeEdBg2HdF_b83HTtr/exec";

// === SIGNUP ===
async function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "signup", username, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
        window.location.href = "index.html";
    }
}

// === LOGIN ===
async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        document.getElementById("msg").innerText = "Please enter both username and password.";
        return;
    }

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password })
    });

    const data = await res.json();

    if (data.success) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "download.html";
    } else {
        document.getElementById("msg").innerText = data.message;
    }
}

// === PAGE PROTECTION ===
function requireLogin() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "index.html";
    }
}

// === LOGOUT ===
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// === DOWNLOAD FILE VIA BLOB ===
async function downloadFile(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            alert("File not found: " + filename);
            return;
        }

        const text = await response.text();
        const blob = new Blob([text], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Download error:", err);
        alert("Failed to download file: " + filename);
    }
}
