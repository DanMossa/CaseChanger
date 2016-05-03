// Saves options to chrome.storage
window.onkeypress = function(event) {
    if (event.shiftKey) {
        document.getElementById('keypressed').innerText = "Shift + " + String.fromCharCode(event.keyCode);
        document.getElementById('keyNumber').innerText = "SHIFT" + event.keyCode;
        document.getElementById('regularKeyNumber').innerText = event.keyCode;

    } else {
        document.getElementById('keypressed').innerText = String.fromCharCode(event.keyCode);
        document.getElementById('keyNumber').innerText = event.keyCode;
    }
};

window.onkeydown = function(event) {
    if (event.shiftKey && event.keyCode == 16) {
        document.getElementById('keypressed').innerText = "Shift";
    } else if (event.shiftKey && event.keyCode != 16) {
        document.getElementById('keypressed').innerText = "Shift + " + event.keyCode;
    } else {
        document.getElementById('keypressed').innerText = event.keyCode;
    }
};

function save_options() {

    if (document.getElementById('keypressed').innerText == "Shift") {
        document.getElementById('settingsSaved').innerText = "Please pair SHIFT with another Key.";
    } else {
        var chosenKey = document.getElementById('keyNumber').innerText;
        var keyText = document.getElementById('keypressed').innerText;
        var regularKeyNumber = document.getElementById('regularKeyNumber').innerText;
        chrome.storage.sync.set({
            currentKey: chosenKey,
            regularKeyNumber: regularKeyNumber,
            keyText: keyText
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('settingsSaved').innerText = "Settings Saved";
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        currentKey: 'SHIFT67',
        regularKeyNumber: '67',
        keyText: 'Shift + C'
    }, function(items) {
        document.getElementById('keypressed').innerText = items.keyText;
        document.getElementById('regularKeyNumber').innerText = items.regularKeyNumber;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveSettings').addEventListener('click',
    save_options);
