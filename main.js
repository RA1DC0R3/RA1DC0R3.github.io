// ====== Initialize users and requests from localStorage ======
let users = JSON.parse(localStorage.getItem("users")) || {};       // {username: password}
let requests = JSON.parse(localStorage.getItem("requests")) || []; // Array of requests

// ====== SIGNUP ======
function signup() {
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    if (users[username]) {
        alert("Username already exists.");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created! You can now log in.");
    window.location.href = "index.html";
}

// ====== LOGIN ======
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    if (users[username] && users[username] === password) {
        localStorage.setItem("currentUser", username);
        alert("Login successful!");
        window.location.href = "homepage.html";
    } else {
        alert("Invalid username or password");
    }
}

// ====== LOGOUT ======
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// ====== DOWNLOAD FILE ======
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

// ====== SUBMIT GAME REQUEST ======
function submitRequest() {
    const name = document.getElementById("requesterName").value.trim();
    const requestText = document.getElementById("gameRequest").value.trim();

    if (!name || !requestText) {
        alert("Please enter both your name and a game request");
        return;
    }

    requests.push({ name, request: requestText, timestamp: new Date().toISOString() });
    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Request submitted successfully!");
    document.getElementById("requesterName").value = "";
    document.getElementById("gameRequest").value = "";
}
