/*global chrome*/
import logo from '../logo.svg'
import './Home.css';

import React, {useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSearchParams, createSearchParams } from "react-router-dom"


export const Home = () => {
    // NOTE: Check first line on top, apparently mandatory for using chrome.runtime.onMessage...
    /*React.useEffect(() => {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request.type === 'request' && request.action === 'SEND_TRANSACTION') {
                    console.log('Extension received message: ', request);
                    sendResponse({
                        extensionId: request.extensionId, 
                        type: 'response',
                        data: {
                            message: "Transactions sent!"
                        }
                    });
                }
            }
        );
    }, []);*/
  
    // Navigate programmatically with in react-router-dom
    let navigate = useNavigate();  // Hook
    function navigateTo(path, queryParams) {
        if (queryParams) {
            navigate({pathname: path, search: queryParams});
        } else {
            navigate({pathname: path});
        }
        
    }

    // Read query params
    let [searchParams, setSearchParams] = useSearchParams();
    let params = Object.fromEntries([...searchParams]);
    delete params.navigateTo;
    const navigateToParam = searchParams.get("navigateTo");
    
    // This hook is used when loading the page, we automatically route if 'navigateTo' query param is set
    useEffect(() => {
        if (navigateToParam && origin) {
            navigateTo("/" + navigateToParam, `?${createSearchParams(params)}`);
        }
    });


    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>
    );
};
