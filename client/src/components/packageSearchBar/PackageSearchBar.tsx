import {useState} from 'react';
import { USE_LOCALHOST } from '../../clientSettings';
import getLuckyTerm from '../../lib/luckySearch';
import './PackageSearchBar.css';
import loadingImg from '../../assets/loading.svg';

export default function PackageSearchBar({
  setAllResults,
  setLastSearchTerm,
  isLoading,
  setIsLoading,
  setCurrentPage
}:{
  setAllResults: Function,
  setLastSearchTerm: Function,
  isLoading: boolean,
  setIsLoading: Function,
  setCurrentPage: Function,
}){
  //search input states
  const [archInput,setArchInput] = useState<string>('any');
  const [repoInput,setRepoInput] = useState<string>('any');
  const [searchInput,setSearchInput] = useState<string>('');
  //if the search is loading show the spinning loading image
  const getLoadingImgStyle = function(){
    if (isLoading){
      return 'block';
    }else{
      return 'none';
    }
  };
  //gets the current button text color for the search and lucky buttons
  const getButtonTextColor = function():string{
    //if the loading display is block we can assume the loading img is being shown to the user
    if (isLoading){
      return 'grey'; //the loading image is currently being shown to the user
    }else{
      return 'black'; //the loading image is not currently being shown to the user (set buttons to regular styling color)
    }
  };
  return(
    <section className='package-search'>
      <h3 className='search-title'>Package Search</h3>
      <form className='search-field'>
        <div className='search-arch'>
          <label>Architecture</label>
          <select value={archInput} onChange={(e)=>{setArchInput(e.target.value.toLowerCase())}}>
            <option>Any</option>
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
                handleSearch(archInput,repoInput,searchInput,setAllResults,setLastSearchTerm,setIsLoading,setCurrentPage);
              }
            }}
          />
        </div>
        <button type='button' style={{color: getButtonTextColor()}} className='search-button' onClick={()=>{handleSearch(archInput,repoInput,searchInput,setAllResults,setLastSearchTerm,setIsLoading,setCurrentPage)}}>Search</button>
        <button type='button' style={{color: getButtonTextColor()}} className='lucky-button' onClick={()=>{handleLuckySearch(setAllResults,setLastSearchTerm,setIsLoading,setCurrentPage)}}>I'm Feeling Lucky</button>
        <img className='loading' style={{display: getLoadingImgStyle()}} src={loadingImg} alt='spinning circle indicating loading' />
      </form>
    </section>
  )
};

const handleLuckySearch = function(setAllResults:any,setLastSearchTerm:any,setIsLoading:any,setCurrentPage:any){
  const lucky = getLuckyTerm();
  handleSearch('any','Any',lucky,setAllResults,setLastSearchTerm,setIsLoading,setCurrentPage)
};

const handleSearch = async function(archInput:any,repoInput:any,searchInput:any,setAllResults:any,setLastSearchTerm:any,setIsLoading:any,setCurrentPage:any){
  let searchResults = [];
  // lock buttons
  const searchButton:any = document.querySelector('.search-button');
  const luckyButton:any = document.querySelector('.lucky-button');
  const getServerUrl = function(){
    if (USE_LOCALHOST){
      return `http://localhost:5000/api/search/${searchInput}`
    }else{
      return `https://wheresmypackage.herokuapp.com/api/search/${searchInput}`
    }
  };
  searchButton.disabled = true;
  luckyButton.disabled = true;
  try{
    setIsLoading(true);
    //form validation
    if (!searchInput || searchInput==='') throw new Error('The package search input cannot be left blank.');
    //get data from sever
    let response = await fetch(getServerUrl(),{
      method : 'GET',
    });
    const responseData = await response.json();
    searchResults = responseData.allResults;
    setLastSearchTerm(searchInput);
    if (searchResults.length===0){
      throw new Error('No results found.');
    }
    //filter array by architecture
    searchResults = searchResults.filter((result:any)=>{
      //if the any field is selected then return every item
      if (archInput.toLowerCase()==='any') return true;
      return result.arch===archInput;
    });
    //filter array by repository
    searchResults = searchResults.filter((result:any)=>{
      //if the any field is selected then return every item
      if (repoInput.toLowerCase()==='any') return true;
      return result.repo===repoInput.toLowerCase();
    });
    if (responseData.exactMatch){
      //remove the exact match from the searchResults arr
      searchResults = searchResults.filter((result:any)=>{
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
  setIsLoading(false);
  //unlock buttons
  searchButton.disabled = false;
  luckyButton.disabled = false;
}