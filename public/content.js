window.addEventListener("message", (event) => {

    // We only accept messages from ourselves and for the correct extension
    if (event.source != window || !event.data || (event.data.direction !== 'toExtension' && event.data.direction !== 'toWebsite')  || event.data.extensionId !== chrome.runtime.id) {
        return;
    }
    const actions = ['CONNECT_WALLET', 'OPEN_WALLET', 'SEND_TRANSACTION'];
    if (event.data.direction === 'toExtension') {
        if (actions.includes(event.data.action)) {
            event.data.origin = window.origin;
            console.log("Content script received message from website: ", event.data);
            console.log("Forwarding message to background script...");
    
            // Send message which is picked up by background script
            chrome.runtime.sendMessage(event.data, function(response) {
                console.log("Content script received response from background script: ", response);
                window.postMessage({
                    extensionId: event.data.extensionId,
                    direction: 'toWebsite',
                    action: event.data.action, 
                    data: response
                }, '*');  // Send a new message as a response back to website
            });
        }
    } 
    
}, false);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        console.log(sender)
        sendResponse();
    }
);