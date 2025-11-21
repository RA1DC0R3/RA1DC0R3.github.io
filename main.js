// ====== Your Apps Script /exec URL ======
const API_URL = "https://script.google.com/macros/s/AKfycbzrdbVgXqrUD0oCyhsjgekou_qHjzzoydEBQ8viGvmmETFbV5LPwJJEKjtA8rfYkPGF/exec";

// ====== LOGIN FUNCTION ======
async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    try {
        const response = await fetch(`${API_URL}?action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        const data = await response.json();
        if (data.success) {
            alert("Login successful!");
            window.location.href = "homepage.html"; // Redirect to homepage
        } else {
            alert("Login failed: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server");
    }
}

// ====== SIGNUP FUNCTION ======
async function signup() {
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    try {
        const response = await fetch(`${API_URL}?action=signup&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        const data = await response.json();
        if (data.success) {
            alert("Account created! You can now log in.");
            window.location.href = "index.html";
        } else {
            alert("Signup failed: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server");
    }
}

// ====== DOWNLOAD FILE FUNCTION ======
function downloadFile(filename) {
    fetch(filename)
        .then(response => {
            if (!response.ok) throw new Error("File not found");
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(err => {
            console.error(err);
            alert("Error downloading file: " + filename);
        });
}

// ====== REQUEST GAME FUNCTION ======
async function submitRequest() {
    const name = document.getElementById("requesterName").value.trim();
    const requestText = document.getElementById("gameRequest").value.trim();

    if (!name || !requestText) {
        alert("Please enter both your name and a game request");
        return;
    }

    try {
        const response = await fetch(`${API_URL}?action=request&name=${encodeURIComponent(name)}&request=${encodeURIComponent(requestText)}`);
        const data = await response.json();
        if (data.success) {
            alert("Request submitted successfully!");
            document.getElementById("requesterName").value = "";
            document.getElementById("gameRequest").value = "";
        } else {
            alert("Request failed: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server");
    }
}

// ====== LOGOUT FUNCTION ======
function logout() {
    window.location.href = "index.html";
}
