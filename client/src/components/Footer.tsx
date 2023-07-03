import '../styles/Footer.css';
//import images
const linkedinLogo = require('../assets/linkedin.svg') as string;
const mailLogo = require('../assets/mail.svg') as string;
const githubLogo = require('../assets/github.svg') as string;
const heartImg = require('../assets/heart.svg') as string;
export default function Footer(){
  return(
    <footer className='footer'>
      <p>Made with <img src={heartImg} alt='a heart' /> by Anthony Infortunio</p>
      <section className='footer-img-container'>
        <img className='pointer' onClick={()=>{window.location.href='https://www.linkedin.com/in/anthony-infortunio-872645220/'}} src={linkedinLogo} alt='linkedin logo' />
        <img className='pointer' onClick={()=>{window.location.href='https://github.com/antinf'}} src={githubLogo} alt='github logo' />
        <img className='pointer' onClick={()=>{window.location.href='mailto:contact@anthonyinfortun.io'}} src={mailLogo} alt='mailing envelope' />
      </section>
    </footer>
  )
}