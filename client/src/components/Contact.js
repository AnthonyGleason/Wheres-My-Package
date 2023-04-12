import React from 'react';
import linkedinLogo from '../assets/linkedin.svg';
import githubLogo from '../assets/github.svg';
import mailImg from '../assets/mail.svg';
export default function Contact(){
  return(
    <div className='contact'>
      <img src={linkedinLogo} onClick={()=>{window.location.href='https://www.linkedin.com/in/anthony-infortunio-872645220/'}} alt='linkedin logo' />
      <img src={githubLogo} onClick={()=>{window.location.href='https://github.com/antinf'}} alt='github logo' />
      <img src={mailImg} onClick={()=>{window.location.href='mailto:contact@anthonyinfortun.io'}} alt='a mailing envelope' />
    </div>
  )
}