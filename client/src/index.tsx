import React from 'react';
import ReactDOM from 'react-dom/client';
//import components
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Package from './components/package/Package';
//using hash router instead of BrowserRouter because we are deploying on gh-pages which only supports HashRouter
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
//import css
import './index.css';
import { ResultBrowser } from './classes/ResultBrowser';
const rootElement:any = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
//holds all of the results returned the server on the last search performed
const resultBrowser = new ResultBrowser();
root.render(
  <React.StrictMode>
    <Nav />
    <Router>
      <Routes>
        <Route path='/' element={<Home resultBrowser={resultBrowser} />} />
        <Route path='/package/:pkgname' element={<Package />} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);