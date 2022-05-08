/*global chrome*/
import React from 'react';
import { useSearchParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const Transaction = () => {  
    
    // Read query params
    let [searchParams, setSearchParams] = useSearchParams()
    const origin = searchParams.get("origin");
    const amount = searchParams.get("amount");
    const token = searchParams.get("token");
    const address = searchParams.get("address");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <TextField id="address" label="Address" variant="outlined" value={address}/>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
            <TextField id="amount" label="Amount" variant="outlined" value={amount} />
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <TextField id="token" label="Token" variant="outlined" value={token}/>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <Button variant="outlined" onClick={() => {
                           alert("not implemented");  
                        }}>
                        Send
                </Button>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    );
};