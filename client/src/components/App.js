import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import searchImg from '../assets/archive-search-outline.svg';
import loadingImg from '../assets/loading.svg';
import { getLucky } from '../config';

function App() {
  const navigate = useNavigate();
  const [pkgInput, setPkgInput] = useState('');
  const [message,setMessage] = useState('');
  return (
    <div className="App">
      <div className='err-messages'>{message}</div>
      <form>
        <div>
          <label htmlFor='pkgName'><img src={searchImg} alt='a square box with a magnifying glass on top of it' /></label>
          <input type='text' placeholder={'What package are you looking for?'} value={pkgInput} onChange={(e)=>{setPkgInput(e.target.value)}} required/>
          <img id='loading' className='hidden' src={loadingImg} alt='loading' />
        </div>
        <button id='package-search' type='button' onClick={()=>{handleSearch(pkgInput,navigate,setMessage)}}>Package Search</button>
        <button id='lucky-search'type='button' onClick={()=>{handleLucky(navigate,setMessage)}}>I'm Feeling Lucky</button>
      </form>
    </div>
  );
}

export default App;

let showLoading = function(){
  //disable buttons
  document.querySelector('#package-search').disabled = true;
  document.querySelector('#lucky-search').disabled = true;
  //show loading spinner
  const loading = document.querySelector('#loading');
  loading.classList.remove('hidden');
  loading.classList.add('loading');
};
let hideLoading = function(){
  //enable buttons
  document.querySelector('#package-search').disabled = false;
  document.querySelector('#lucky-search').disabled = false;
  //hide loading spinner
  const loading = document.querySelector('#loading');
  loading.classList.remove('loading');
  loading.classList.add('hidden')
};
let handleLucky = function(navigate,setMessage){
  const pkgName = getLucky();
  handleSearch(pkgName,navigate,setMessage);
}
let handleSearch = function(pkgName,navigate,setMessage){
  //clear message
  setMessage('');
  showLoading();
  getPkgData(pkgName,navigate,setMessage);
};

let getPkgData = async function(pkgName,navigate,setMessage){
  let pkgData = [];
  try{
    //form validation
    if (!pkgName) throw new Error('A package name must be entered.');
    if (pkgName==='') throw new Error('The package input canno tbe left blank.');
    //get data from sever
    let response = await fetch(`http://localhost:5000/api/search/${pkgName}`,{
      method : 'GET',
    });
    pkgData = await response.json();
    if (pkgData.results.length===0){
      setMessage('No results found.');
      throw new Error('No results found.');
    }
    navigate(`/package/${pkgName}`,{state: {pkgData,pkgName}});
  }catch(e){
    console.log(`${e} when getting package data`);
    hideLoading();
  }
};