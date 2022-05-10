/*global chrome*/
import React from 'react';
//import React, {useEffect, useState } from 'react';
//import { useSearchParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const SiteApproval = () => {  

    /*function setList() {
        return allowedSitesState.map((element) => { 
            return <li>{element}</li>;
        });
    }*/

    function trustOrigin() {
        //if (flag && !allowedSitesState.includes(origin)) {
        if (true) {
            /*allowedSitesState.push(origin);
            chrome.storage.local.set({'allowedSites': JSON.stringify(allowedSitesState)}, function() { 
            });*/

            //setAllowedSites(allowedSitesState);
            
            // TO FIX (content script does not receive message)
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                console.log('HERERERER')
                chrome.tabs.sendMessage(tabs[0].id, {
                    direction: 'toWebsite',
                    action: 'UPDATE_CONNECTION_STATUS', 
                    data: origin
                }, function(response){
                    console.log(response);
                });
            });
        }
        //navigate('/index.html');
    }

    // Read query params
    //let [searchParams, setSearchParams] = useSearchParams()
    //const origin = searchParams.get("origin");

    // Handle allowedSites state
    //let [allowedSitesState, setAllowedSites] = useState([]);

    // Read allowedSites from storage and put them in the state
    /*useEffect(() => {
        chrome.storage.local.get(['allowedSites'], function(result) {
            if (result.allowedSites) {
                result.allowedSites = JSON.parse(result.allowedSites);
            } else {
                result.allowedSites = [];
            }
            setAllowedSites(result.allowedSites);
          });
        
    }, []);*/

    //let navigate = useNavigate();  // Hook

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                Trusted Sites:
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <ul>
                    {/*setList()*/}
                </ul>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                Do you trust this website: {origin}?
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <Button variant="outlined" onClick={() => {
                           trustOrigin();  
                        }}>
                        YES
                </Button>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <Button variant="outlined" onClick={() => {
                            trustOrigin();  
                        }}>
                        NO
                </Button>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    );
};