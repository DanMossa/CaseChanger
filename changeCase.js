var theKeythatwasPressed;
var shiftPressed = 0;
var pressedKeyCode;
window.addEventListener("keypress", function(e) {
    restore_options();
    if (shiftPressed == 1) {
        if (e.keyCode == pressedKeyCode && getSelectionText() != "" && e.shiftKey) {
            e.preventDefault();
            replaceSelectedText(strcon(getSelectionText()));
        }
    } else {
        if (e.keyCode == theKeythatwasPressed && getSelectionText() != "") {
            e.preventDefault();
            replaceSelectedText(strcon(getSelectionText()));
        }
    }
});

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function strcon(givenString) {
    var b = '';
    var a = givenString;
    for (i = 0; i < a.length; i++) {
        if (a.charCodeAt(i) >= 65 && a.charCodeAt(i) <= 90) {
            b = b + a.charAt(i).toLowerCase();
        } else
            b = b + a.charAt(i).toUpperCase();
    }
    return b;
}

function replaceSelectedText(text) {
    var txtArea = document.activeElement;
    if (txtArea.selectionStart != undefined) {
        var startPos = txtArea.selectionStart;
        var endPos = txtArea.selectionEnd;
        selectedText = txtArea.value.substring(startPos, endPos);
        txtArea.value = txtArea.value.slice(0, startPos) + text + txtArea.value.slice(endPos);
    }
}

function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        currentKey: 'SHIFT67',
        regularKeyNumber: '67',
        keyText: 'Shift + C'
    }, function(items) {
        theKeythatwasPressed = items.currentKey;
        if (theKeythatwasPressed.includes("SHIFT")) {
            shiftPressed = 1;
            pressedKeyCode = items.regularKeyNumber;
        }
    });
}
