window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source != window) {
    return;
  }

  if (event.data.type && (event.data.type == "OPEN_EXTENSION" || event.data.type == "TEST_MESSAGE")) {
    console.log("Content script received message from website: " + event.data.message);
    
    // Send message which is picked up by background script and/or extension app
    chrome.runtime.sendMessage({type: event.data.type, message: event.data.message + ', forwarded from content script'}, function(response) {
        console.log("Content script received response from extension or background script: " + response.message);
    });
  }
}, false);