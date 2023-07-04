import {useState} from 'react';
import './PackageSearch.css';
import getLuckyTerm from '../../lib/lucky';
import loadingImg from '../../assets/loading.svg';

//TOGGLE BETWEEN LOCAL HOST AND SERVER
const USE_LOCALHOST = true;

export default function PackageSearch({setAllResults,setLastSearchTerm,loadingDisplay,setLoadingDisplay,setCurrentPage}){
  //search input states
  const [archInput,setArchInput] = useState('any');
  const [repoInput,setRepoInput] = useState('any');
  const [searchInput,setSearchInput] = useState('');
  return(
    <section className='package-search'>
      <h3 className='search-title'>Package Search</h3>
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
                handleSearch(archInput,repoInput,searchInput,setAllResults,setLastSearchTerm,setLoadingDisplay,setCurrentPage);
              }
            }} 
          />
        </div>
        <button type='button' style={{color: getButtonColor(loadingDisplay)}} className='search-button' onClick={()=>{handleSearch(archInput,repoInput,searchInput,setAllResults,setLastSearchTerm,setLoadingDisplay,setCurrentPage)}}>Search</button>
        <button type='button' style={{color: getButtonColor(loadingDisplay)}} className='lucky-button' onClick={()=>{handleLuckySearch(setAllResults,setLastSearchTerm,setLoadingDisplay,setCurrentPage)}}>I'm Feeling Lucky</button>
        <img className='loading' style={{display: loadingDisplay}} src={loadingImg} alt='spinning circle indicating loading' />
      </form>
    </section>
  )
}
const getButtonColor = function(loadingDisplay){
  if (loadingDisplay==='block'){
    return 'grey';
  }else{
    return 'black';
  }
}
const handleLuckySearch = function(setAllResults,setLastSearchTerm,setLoadingDisplay,setCurrentPage){
  let lucky = getLuckyTerm();
  handleSearch('any','Any',lucky,setAllResults,setLastSearchTerm,setLoadingDisplay,setCurrentPage)
}
const getServerUrl = function(searchInput){
  if (USE_LOCALHOST){
    return `http://localhost:5000/api/search/${searchInput}`
  }else{
    return `https://wheresmypackage.herokuapp.com/api/search/${searchInput}`
  }
}
export const handleSearch = async function(archInput,repoInput,searchInput,setAllResults,setLastSearchTerm,setLoadingDisplay,setCurrentPage){
  let searchResults = [];
  // lock buttons
  let searchButton:any = document.querySelector('.search-button');
  let luckyButton:any = document.querySelector('.lucky-button');
  searchButton.disabled = true;
  luckyButton.disabled = true;
  try{
    setLoadingDisplay('block');
    //form validation
    if (!searchInput || searchInput==='') throw new Error('The package search input cannot be left blank.');
    //get data from sever
    let response = await fetch(getServerUrl(searchInput),{
      method : 'GET',
    });
    const responseData = (await response.json())
    searchResults = responseData.allResults;
    setLastSearchTerm(searchInput);
    if (searchResults.length===0){
      throw new Error('No results found.');
    }
    //filter array by architecture
    searchResults = searchResults.filter((result)=>{
      //if the any field is selected then return every item
      if (archInput.toLowerCase()==='any') return true;
      return result.arch===archInput;
    });
    //filter array by repository
    searchResults = searchResults.filter((result)=>{
      //if the any field is selected then return every item
      if (repoInput.toLowerCase()==='any') return true;
      return result.repo===repoInput.toLowerCase();
    });
    if (responseData.exactMatch){
      //remove the exact match from the searchResults arr
      searchResults = searchResults.filter((result)=>{
        return result.pkgname!==responseData.exactMatch.pkgname;
      })
      //set the exact match as the first result
      searchResults.unshift(responseData.exactMatch);
    }
    setCurrentPage(1)
  }catch(e){
    console.log(`${e} when getting package data`);
    setCurrentPage(0);
  }
  if (searchResults===undefined) return 0;
  setAllResults(searchResults);
  setLoadingDisplay('none');
  //unlock buttons
  searchButton.disabled = false;
  luckyButton.disabled = false;
}