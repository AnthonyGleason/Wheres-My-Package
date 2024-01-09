import React from 'react';
import ReactDOM from 'react-dom/client';
//import components
import Home from '../src/Components/home/Home';
import Nav from '../src/Components/nav/Nav';
import PackageViewer from '../src/Components/packageViewer/PackageViewer';
//using hash router instead of BrowserRouter because we are deploying on gh-pages which only supports HashRouter
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import { PackageBrowser } from '../src/Classes/PackageBrowser';
//import css
import './index.css';

const rootElement:any = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

//Package Browser is the current instance of the user search.
const packageBrowser = new PackageBrowser();

root.render(
  <React.StrictMode>
    <Nav />
    <Router>
      <Routes>
        <Route path='/' element={<Home packageBrowser={packageBrowser} />} />
        <Route path='/package/:pkgname' element={<PackageViewer packageBrowser={packageBrowser} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);