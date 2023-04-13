import React from 'react';
import archLogo from '../assets/arch-logo.png';
import '../styles/Nav.css';
export default function Nav(){
  return(
    <div className='nav'>
      <img src={archLogo} />
      <ul className='nav-buttons'>
        <li>Packages</li>
        <li>Contact</li>
      </ul>
    </div>
  )
}