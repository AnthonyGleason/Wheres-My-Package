import React from 'react';
import archLogo from '../assets/arch-logo.png';
import '../styles/Nav.css';
export default function Nav(){
  return(
    <div className='nav'>
      <img src={archLogo} className='pointer' onClick={()=>{window.location.href='/'}} />
      <ul className='nav-buttons'>
        <li className='pointer' onClick={()=>{window.location.href='/'}}>Packages</li>
      </ul>
    </div>
  )
}