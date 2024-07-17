import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/head.jsx';
import { Body } from './component/body.jsx';
import Summary from './component/secondPage.jsx';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/summary/:id" element={<Summary />} />
            </Routes>
        </Router>
    );
}

export default App;
