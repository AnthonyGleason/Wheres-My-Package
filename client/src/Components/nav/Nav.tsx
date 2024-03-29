import './Nav.css';
const archLogo = require('../../Assets/arch-logo.png');

export default function Nav(){
  return(
    <nav className='nav'>
      <a href='/Wheres-My-Package' className='arch-logo pointer'>
        <img src={archLogo} alt='arch linux logo' />
      </a>
      <ul className='nav-buttons'>
        <li className='pointer' onClick={()=>{window.location.href='/Wheres-My-Package'}}>Packages</li>
      </ul>
    </nav>
  )
}