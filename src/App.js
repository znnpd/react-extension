import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from './pages/Home';
import {SiteApproval} from './pages/SiteApproval';
import {Transaction} from './pages/Transaction';

function App() {
     
    return (
        <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/index.html" element = {<Home/>}/>
            <Route path="/siteapproval.html" element = {<SiteApproval/>}/>
            <Route path="/transaction.html" element = {<Transaction/>}/>
        </Routes>
    );
}

export default App;
