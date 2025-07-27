// Get references to the DOM elements
const qrText = document.getElementById("qr-text");        // Input field for text/URL
const sizes = document.getElementById("sizes");           // Dropdown for QR code size
const generateBtn = document.getElementById("generateBtn"); // Generate button
const downloadBtn = document.getElementById("downloadBtn"); // Download button
const qrContainer = document.querySelector(".qr-body");     // Container where the QR code appears

// Set default size from dropdown
let size = sizes.value;

// ========== EVENT: On Generate Button Click ========== //
generateBtn.addEventListener("click", function (e) {
    e.preventDefault();   // Prevent page reload or form submission
    isEmptyInput();       // Call function to check and generate QR
});

// ========== EVENT: On Size Change ========== //
sizes.addEventListener("change", (e) => {
    size = e.target.value; // Update selected size
    isEmptyInput();        // Re-generate QR code with new size if text is already entered
});

// ========== EVENT: On Download Button Click ========== //
downloadBtn.addEventListener("click", () => {
    let img = document.querySelector(".qr-body img"); // Check if QR was created as an <img>

    if (img !== null) {
        let imgArr = img.getAttribute("src");         // Get image source URL (base64)
        downloadBtn.setAttribute("href", imgArr);     // Set it as the download link
    } else {
        // Fallback: If image is a <canvas> element instead of <img>
        downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
        // Note: This may create a blank image if QR hasn't been generated yet
    }
});

// ========== EVENT: On Page Load ========== //
window.addEventListener("DOMContentLoaded", () => {
    qrText.value = "";            // Clear the input box on page load
    qrContainer.innerHTML = "";   // Clear any existing QR code
});

// ========== FUNCTION: Check Input and Generate QR ========== //
function isEmptyInput() {
    if (qrText.value.length > 0) {
        generateQRCode();  // Input is not empty — generate the QR code
    } else {
        alert("Enter the Text or URL to generate your QR code"); // Warn user if input is empty
    }

    // ✅ Alternate shorthand way:
    // qrText.value.length > 0 ? generateQRCode() : alert("Enter the Text or URL...");
}

// ========== FUNCTION: Generate the QR Code ========== //
function generateQRCode() {
    qrContainer.innerHTML = ""; // Clear previous QR code before generating a new one

    new QRCode(qrContainer, {
        text: qrText.value,   // Text or URL to encode
        height: size,         // QR height (based on selected size)
        width: size,          // QR width
        colorLight: "#fff",   // Background color (white)
        colorDark: "#000",    // QR color (black)
    });
}
