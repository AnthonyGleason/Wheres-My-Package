import React from 'react';
import ReactDOM from 'react-dom/client';
//import components
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Package from './components/package/Package';
//import css
import './index.css';
//using hash router instead of BrowserRouter because we are deploying on gh-pages which only supports HashRouter
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
const rootElement:any = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
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