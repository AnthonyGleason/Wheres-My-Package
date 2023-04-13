import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import loadingImg from '../assets/loading.svg';
import pkgImg from '../assets/package.svg';
import heartImg from '../assets/heart.svg';
import { getLucky } from '../lucky';
import Contact from './Contact';

function App() {
  const navigate = useNavigate();
  const [pkgInput, setPkgInput] = useState('');
  const [message,setMessage] = useState('');
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch(pkgInput, navigate, setMessage);
    }
  };
  return (
    <div className="App">
      <div className='err-messages'>{message}</div>
      <form>
        <div>
          <div className='home-title'>Where's My Package?</div>
          <div className='desc'>"<em>An Arch Linux Package Aggregator For <span className='home-em-text'>Official</span> and <span className='home-em-text'>Aur</span> Packages</em> "</div>
          <div className='search'>
            <img className='search-img-home' src={pkgImg} alt='a square package' />
            <input className='search-input' type='text' placeholder={'Enter a package (i.e Systemd)'} value={pkgInput} onChange={(e)=>{setPkgInput(e.target.value)}} onKeyDown={handleKeyDown} required/>
          </div>
          <div className='loading hidden'>
            <img id='loading' src={loadingImg} alt='loading' />
          </div>
          <div className='search-buttons'>
            <button id='package-search' type='button' onClick={()=>{handleSearch(pkgInput,navigate,setMessage)}}>Package Search</button>
            <button id='lucky-search'type='button' onClick={()=>{handleLucky(navigate,setMessage)}}>I'm Feeling Lucky</button>
          </div>
          <div className='credits'>
            Made with <img src={heartImg} /> by Anthony Infortunio for the Arch Community
          </div>
          <div className='source'>This page is open source! View the source code <a href='https://github.com/antinf/Wheres-My-Package'><em>here</em></a></div>
          <p style={{textAlign: 'center'}}>Contact Me:</p>
          <Contact />
        </div>
      </form>
    </div>
  );
};

export default App;

// show the loading animation to the user, lock submit buttons
let showLoading = function(){
  //disable buttons
  document.querySelector('#package-search').disabled = true;
  document.querySelector('#lucky-search').disabled = true;
  //show loading spinner
  const loading = document.querySelector('.loading');
  loading.classList.remove('hidden');
  loading.classList.add('loading');
};

// hide the loading animation from the user, unlock submit buttons
let hideLoading = function(){
  //enable buttons
  document.querySelector('#package-search').disabled = false;
  document.querySelector('#lucky-search').disabled = false;
  //hide loading spinner
  const loading = document.querySelector('#loading');
  loading.classList.remove('loading');
  loading.classList.add('hidden')
};

// gets a random package from the lucky array and show results for it
let handleLucky = function(navigate,setMessage){
  const pkgName = getLucky();
  handleSearch(pkgName,navigate,setMessage);
};

//handles search when the user presses the search button. This also used for lucky search after a pkgName is generated.
let handleSearch = function(pkgName,navigate,setMessage){
  //clear message
  setMessage('');
  showLoading();
  getPkgData(pkgName,navigate,setMessage);
};

//gets the package data from the server at localhost:5000
let getPkgData = async function(pkgName,navigate,setMessage){
  let searchResults = [];
  try{
    //form validation
    if (!pkgName || pkgName==='') throw new Error('The package search input cannot be left blank.');
    //get data from sever
    let response = await fetch(`https://wheresmypackage.herokuapp.com/api/search/${pkgName}`,{
      method : 'GET',
    });
    searchResults = (await response.json());
    if (searchResults.length===0){
      setMessage('No results found.');
      throw new Error('No results found.');
    }
    navigate(`/results/${pkgName}`,{state: {searchResults,pkgName}});
  }catch(e){
    console.log(`${e} when getting package data`);
    setMessage(`${e}`);
    hideLoading();
  }
};