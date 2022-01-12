console.log('initiated');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Only handle OPEN_EXTENSION
    if (request.type === 'OPEN_EXTENSION') {
      console.log('Background Script: ' + request.message);
      chrome.windows.getLastFocused().then((window) => {
        const width = 600 + 100;
        const height = 400 + 100;
        const left = window.width - width;
        chrome.windows.create({url: "./index.html", type: "popup", height: height, width: width, left: left, focused: true});
      });
    sendResponse({message: "Hello from background script, extension popup opened!"});
    }
  }
);