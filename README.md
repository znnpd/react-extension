# react-extension

## Setup
* Run `nmp run build` which builds the app into folder `build`
* Import the folder as local extension (_load unpacked_) into chrome (make sure to enable developer mode)
* Open the extension, right-click on it and select inspect to open the console
* Open file `index_website.html` which is a super basic website that interacts with the extension and open the console

## Components
In order to send messages from any website to a chrome extension the following components are needed in the chrome extension ecosystem:

### Extension Webapp (plain html/js or ReactJS app)
* Extension UI

### Content script
* Injected in any website (based on matching rules)
* Has access to website DOM and can listen to `postMessage()` from website
* Can communicate with extension and background script

### Background script
* Always-running script for extension
* Can communicate with extension and content script

## Message Flow
1. Website (index_website.html) posts a message using `window.postMessage()`
2. Content script has an event listener for the message event
3. Content script sends a message using `chrome.runtime.sendMessage()` (request/response) or `chrome.runtime.connect()` (long-living connection)
4. Extension popup app (i.e. ReactJS) and background script add a message listener using `chrome.runtime.onMessage.addListener()` or in `chrome.runtime.connect()` to receive the message. **NOTE**: In functional ReactJS the `useEffect()` hook must be used to register the listener! 