console.log('background script initiated');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        
        if (request.extensionId !== 'debacohmniakednmhgobhbopmocbfkja' || !request.action) {
            return
        };

        console.log('Background script received request: ', request);
        if (request.action === 'CONNECT_WALLET') {
            chrome.storage.local.get(['allowedSites'], function(result) {
                let connected = false;
                let accounts = [];
                let message = "";
                if (!result.allowedSites || !JSON.parse(result.allowedSites).map(e => e.toLocaleLowerCase()).includes(request.origin)) {
                    openExtension("./index.html?navigateTo=siteapproval.html&origin=" + request.origin);
                    message = "Hello from background script, extension wallet opened for user approval of connection!";
                } else {  
                    connected = true;                
                    accounts = ["address1", "address2"];
                    message = "Hello from background script, origin already connected!"
                }
                sendResponse({connectionStatus: connected, accounts: accounts, message: message});
            });
            return true;
        } else if (request.action === 'OPEN_WALLET') {
            console.log('OPEN_WALLET');
            chrome.windows.getLastFocused().then((window) => {
                const width = 600 + 100;
                const height = 400 + 100;
                const left = window.width - width;
                chrome.windows.create({url: "./index.html", type: "popup", height: height, width: width, left: left, focused: true});
            });
            sendResponse({});
        } else if (request.action === 'SEND_TRANSACTION') {
            console.log('SEND_TRANSACTION');
            openExtension("./index.html?navigateTo=transaction.html&origin=" + request.origin + "&amount=" + request.data.amount + "&address=" + request.data.address + "&token=" + request.data.token);
            sendResponse({message: 'Transaction popup opened!'});
        }
    }
);

function openExtension(path) {
    chrome.windows.getLastFocused().then((window) => {
        const width = 600 + 100;
        const height = 400 + 100;
        const left = window.width - width;
        chrome.windows.create({url: path, type: "popup", height: height, width: width, left: left, focused: true});
    }); 
}