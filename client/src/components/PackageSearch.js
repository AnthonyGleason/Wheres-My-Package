import React, {useState} from 'react';
import '../styles/PackageSearch.css';
import loadingImg from '../assets/loading.svg';
import getLucky from '../scripts/lucky';
export default function PackageSearch({allResults,setAllResults,setLastSearchTerm,loadingDisplay,setLoadingDisplay}){
  //search input states
  const [archInput,setArchInput] = useState('any');
  const [repoInput,setRepoInput] = useState('any');
  const [searchInput,setSearchInput] = useState('');
  return(
    <div className='package-search'>
      <div className='search-title'>Package Search</div>
      <form className='search-field'>
        <div className='search-arch'>
          <label>Architecture</label>
          <select value={archInput} onChange={(e)=>{setArchInput(e.target.value)}}>
            <option>any</option>
            <option>x86_64</option>
          </select>
        </div>
        <div className='search-repo'>
          <label>Repository</label>
          <select value={repoInput} onChange={(e)=>{setRepoInput(e.target.value)}}>
            <option>Any</option>
            <option>Community</option>
            <option>Community-Testing</option>
            <option>Core</option>
            <option>Extra</option>
            <option>Aur</option>
            <option>KDE-Unstable</option>
            <option>Multilib</option>
            <option>Multilib-testing</option>
            <option>Testing</option>
          </select>
        </div>
        <div className='search-terms'>
          <label>Search Terms</label>
          <input value={searchInput} onChange={(e)=>{setSearchInput(e.target.value)}} onKeyDown={(e) => {
              if (e.key==='Enter'){
                e.preventDefault();
                handleSearch(archInput,repoInput,searchInput,setAllResults,setLastSearchTerm,setLoadingDisplay);
              }
            }} 
          />
        </div>
        <button type='button' style={{color: getButtonColor(loadingDisplay)}} className='search-button' onClick={()=>{handleSearch(archInput,repoInput,searchInput,setAllResults,setLastSearchTerm,setLoadingDisplay)}}>Search</button>
        <button type='button' style={{color: getButtonColor(loadingDisplay)}} className='lucky-button' onClick={()=>{handleLucky(setAllResults,setLastSearchTerm,setLoadingDisplay)}}>I'm Feeling Lucky</button>
        <img className='loading' style={{display: loadingDisplay}} src={loadingImg} alt='spinning circle indicating loading' />
      </form>
    </div>
  )
}
let getButtonColor = function(loadingDisplay){
  if (loadingDisplay==='block'){
    return 'grey';
  }else{
    return 'black';
  }
}
let handleLucky = function(setAllResults,setLastSearchTerm,setLoadingDisplay){
  let lucky = getLucky();
  handleSearch('any','Any',lucky,setAllResults,setLastSearchTerm,setLoadingDisplay)
}
export let handleSearch = async function(archInput,repoInput,searchInput,setAllResults,setLastSearchTerm,setLoadingDisplay){
  let searchResults = [];
  // lock buttons
  let searchButton = document.querySelector('.search-button');
  let luckyButton = document.querySelector('.lucky-button');
  searchButton.disabled = true;
  luckyButton.disabled = true;
  try{
    setLoadingDisplay('block');
    //form validation
    if (!searchInput || searchInput==='') throw new Error('The package search input cannot be left blank.');
    //get data from sever
    let response = await fetch(`https://wheresmypackage.herokuapp.com/api/search/${searchInput}`,{
      method : 'GET',
    });
    searchResults = (await response.json()).allResults;
    setLastSearchTerm(searchInput);
    if (searchResults.length===0){
      throw new Error('No results found.');
    }
    //filter array by architecture
    searchResults = searchResults.filter((result)=>{
      return (result.arch===archInput);
    })
    //filter array by repository
    searchResults = searchResults.filter((result)=>{
      //if the any field is selected then return every item
      if (repoInput.toLowerCase()==='any') return true;
      return (result.repo===repoInput.toLowerCase());
    })
  }catch(e){
    console.log(`${e} when getting package data`);
  }
  if (searchResults===undefined) return 0;
  setAllResults(searchResults);
  setLoadingDisplay('none');
  //unlock buttons
  searchButton.disabled = false;
  luckyButton.disabled = false;
}