import './Footer.css';
//import images
import linkedinLogo from '../../Assets/linkedin.svg';
import mailLogo from '../../Assets/mail.svg';
import githubLogo from '../../Assets/github.svg';
import heartImg from '../../Assets/heart.svg';

export default function Footer(){
  return(
    <footer className='footer'>
      <section className='footer-img-container'>
        <img className='pointer' onClick={()=>{window.location.href='https://www.linkedin.com/in/anthony-infortunio-872645220/'}} src={linkedinLogo} alt='linkedin logo' />
        <img className='pointer' onClick={()=>{window.location.href='https://github.com/antinf'}} src={githubLogo} alt='github logo' />
        <img className='pointer' onClick={()=>{window.location.href='mailto:contact@anthonyinfortun.io'}} src={mailLogo} alt='mailing envelope' />
      </section>
    </footer>
  )
}