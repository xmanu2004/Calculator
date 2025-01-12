let pinInput = document.getElementById('pinInput');
let usernameInput = document.getElementById('usernameInput');
let pinCode = '';
let username = '';

// Append number to pin code
function appendNumber(number) {
    if (pinCode.length < 4) {
        pinCode += number;
        pinInput.value = pinCode;
    }
}

// Clear the input field
function clearInput() {
    pinCode = '';
    pinInput.value = pinCode;
}

// Show Modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Handle pin submission
function submitPin() {
    username = usernameInput.value.trim();

    if (username === "") {
        showModal('modal-username');  // Show username error modal
        return;
    }

    if (pinCode.length === 4) {
        showModal('modal-success');  // Show success modal
        // Optionally redirect or reset input for the next step
        setTimeout(() => {
            window.location.href = 'index.html'; // Or any other action you want
        }, 2000);
    } else {
        showModal('modal-pin');  // Show pin error modal
    }
}
