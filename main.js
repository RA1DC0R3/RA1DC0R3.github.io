// ====== DOWNLOAD ANY FILE (ZIP, HTML, JS, etc.) ======
function downloadFile(filename) {
    fetch(filename)
        .then(response => {
            if (!response.ok) throw new Error("File not found");
            return response.blob(); // Use blob() so ZIP files work
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename; // Save with same name
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url); // Clean up memory
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

// ====== SUBMIT BUG REPORT ======
function submitReport() {
    const name = document.getElementById("reporterName").value.trim();
    const reportText = document.getElementById("gameReport").value.trim();

    if (!name || !reportText) {
        alert("Please enter both your name and a bug report");
        return;
    }

    requests.push({ name, report: reportText, timestamp: new Date().toISOString() });
    localStorage.setItem("reports", JSON.stringify(requests));

    alert("Report submitted successfully!");
    document.getElementById("reporterName").value = "";
    document.getElementById("gameReport").value = "";
}

