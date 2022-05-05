/*global chrome*/
import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
    // NOTE: Check first line on top, apparently mandatory for using chrome.runtime.onMessage...
    React.useEffect(() => {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request.action === 'SEND_TRANSACTION') {
                    sendResponse({response: "Transactions sent!"});
                    console.log('Extension received message: ', request);
                }
            }
        );
    }, []);
  
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>
    );
}

export default App;
