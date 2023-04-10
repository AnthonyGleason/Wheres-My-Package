import React from 'react';
import arch from '../assets/arch.svg';
import '../styles/Nav.css'
export default function Nav(){
  return(
    <div className='nav'>
      <img className='pointer' onClick={()=>window.location.href='/'} src={arch}/>
      <span className='pointer' onClick={()=>window.location.href='/'}>Where's My Package?</span>
      <ul className='nav-buttons'>
        <li className='pointer' onClick={()=>window.location.href='/'}>Package Search</li>
        <li className='pointer' onClick={()=>window.location.href='/contact'}>Contact</li>
      </ul>
    </div>
  )
}