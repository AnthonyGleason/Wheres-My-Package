import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import reportWebVitals from './reportWebVitals';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Nav />
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);

reportWebVitals();
