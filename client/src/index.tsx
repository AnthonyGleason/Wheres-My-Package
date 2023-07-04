import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Package from './components/package/Package';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Nav />
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/package/:pkgname' element={<Package />} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);