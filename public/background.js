console.log('background script initiated');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.extensionId === 'will_be_uuid' && request.action === 'OPEN_WALLET') {
            console.log('Background script received request: ', request);
            chrome.windows.getLastFocused().then((window) => {
                const width = 600 + 100;
                const height = 400 + 100;
                const left = window.width - width;
                chrome.windows.create({url: "./index.html", type: "popup", height: height, width: width, left: left, focused: true});
            });
            sendResponse({message: "Hello from background script, extension wallet opened!"});
        }
    }
);