import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Package from './components/Package';
import Results from './components/Results';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* '/' route is the homepage which allows the user to search for packages */}
        <Route path='/' element={<App />} />
        {/* '/results/:pkgName' shows all results of the package search to the user */}
        <Route path='/results/:pkgName' element={<Results />} />
        {/* '/package/:pkgName' shows the selected package (obtained from the route params) to the user */}
        <Route path='/package/:pkgName' element={<Package />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
