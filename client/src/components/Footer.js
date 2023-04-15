import React from 'react';
import '../styles/Footer.css';
//import images
import linkedinLogo from '../assets/linkedin.svg';
import mailLogo from '../assets/mail.svg';
import githubLogo from '../assets/github.svg';
import heartImg from '../assets/heart.svg';
export default function Footer(){
  return(
    <div className='footer'>
      <p>Made with <img src={heartImg} alt='a heart' /> by Anthony Infortunio</p>
      <p>Contact Me:</p>
      <div className='footer-img-container'>
        <img className='pointer' onClick={()=>{window.location.href='https://www.linkedin.com/in/anthony-infortunio-872645220/'}} src={linkedinLogo} alt='linkedin logo' />
        <img className='pointer' onClick={()=>{window.location.href='https://github.com/antinf'}} src={githubLogo} alt='github logo' />
        <img className='pointer' onClick={()=>{window.location.href='mailto:contact@anthonyinfortun.io'}} src={mailLogo} alt='mailing envelope' />
      </div>
    </div>
  )
}