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
        <img className='pointer' src={linkedinLogo} alt='linkedin logo' />
        <img className='pointer' src={githubLogo} alt='github logo' />
        <img className='pointer' src={mailLogo} alt='mailing envelope' />
      </div>
    </div>
  )
}