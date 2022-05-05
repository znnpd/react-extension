window.addEventListener("message", (event) => {
    
    // We only accept messages from ourselves and for the correct extension
    if (event.source != window || event.data.extensionId != 'will_be_uuid') {
        return;
    }
    
    if (event.data.action == 'SEND_TRANSACTION') {
        console.log("Content script received message from website: ", event.data);
        console.log("Forwarding message to extension...");

        // Send message which is picked up by background script and/or extension app
        chrome.runtime.sendMessage(event.data, function(response) {
            console.log("Content script received response from extension: ", response);
        });
    }

    if (event.data.action == 'OPEN_WALLET') {
        console.log("Content script received message from website: ", event.data);
        console.log("Forwarding message to background script...");

        // Send message which is picked up by background script and/or extension app
        chrome.runtime.sendMessage(event.data, function(response) {
            console.log("Content script received response from background script: ", response);
        });
    }
    
}, false);