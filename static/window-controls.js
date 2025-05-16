// Window control functionality
const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    // Get window control buttons
    const minimizeButton = document.getElementById('minimize-btn');
    const maximizeButton = document.getElementById('maximize-btn');
    const closeButton = document.getElementById('close-btn');

    // Add event listeners for window controls
    if (minimizeButton) {
        minimizeButton.addEventListener('click', () => {
            ipcRenderer.send('minimize-window');
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            ipcRenderer.send('close-window');
        });
    }
    if (maximizeButton) {
        maximizeButton.addEventListener('click', () => {
            ipcRenderer.send('maximize-window');
        });
    }
});
