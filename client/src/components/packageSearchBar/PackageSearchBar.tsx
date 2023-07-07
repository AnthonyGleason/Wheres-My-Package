import './PackageSearchBar.css';
import { useState } from 'react';
import loadingImg from '../../assets/loading.svg';
import { ResultBrowser } from '../../classes/ResultBrowser';
import { Package } from '../../interfaces/interfaces';

export default function PackageSearchBar({resultBrowser,setResults}:{resultBrowser:ResultBrowser,setResults:Function}){
  const [archInput,setArchInput] = useState<string>(resultBrowser.archInput);
  const [repoInput,setRepoInput] = useState<string>(resultBrowser.repoInput);
  const [searchInput,setSearchInput] = useState<string>(resultBrowser.searchInput);
  const [buttonTextColor,setButtonTextColor] = useState<string>(resultBrowser.getButtonTextColor());

  const handleSearchEvent = async function(isLucky:boolean){
    //user is submitting a lucky search
    if (isLucky){
      resultBrowser.searchQuery.setLuckyTerm();
    }else{
      //otherwise set the search input as the search term
      resultBrowser.searchQuery.term = resultBrowser.searchInput;
    }
    //lock the buttons so users cannot send more than 1 search at a time
    resultBrowser.lockSearch()
    setButtonTextColor(resultBrowser.getButtonTextColor());
    //get search results
    await resultBrowser.searchQuery
      .getResults()
      .then((results:Package[])=>{
        resultBrowser.searchQuery.results = results;
        //filter the search results to the user provided constraints
        setResults(resultBrowser.filterResults());
        //if there are results set the current page to 1 (this is needed to the results snip for the page can be generated)
        if (resultBrowser.searchQuery.results) resultBrowser.currentPage=1;
        resultBrowser.unlockSearch();
        setButtonTextColor(resultBrowser.getButtonTextColor());
    });
  };

  const handleInputChange = function(input:string,inputType:string){
    const tempInput = input;
    switch(inputType){
      case 'arch':
        resultBrowser.setInput('arch',tempInput);
        setArchInput(tempInput);
        break;
      case 'repo':
        resultBrowser.setInput('repo',tempInput);
        setRepoInput(tempInput);
        break;
      case 'search':
        resultBrowser.setInput('search',tempInput);
        setSearchInput(tempInput);
        break;
      default:
        break;
    };
  };

  return(
    <section className='package-search'>
      <h3 className='search-title'>Package Search</h3>
      <form className='search-field'>
        <div className='search-arch'>
          <label>Architecture</label>
          <select value={archInput} onChange={(e)=>{handleInputChange(e.target.value,'arch')}}>
            <option>Any</option>
            <option>x86_64</option>
          </select>
        </div>
        <div className='search-repo'>
          <label>Repository</label>
          <select value={repoInput} onChange={(e)=>{handleInputChange(e.target.value,'repo')}}>
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
          <input value={searchInput} onChange={(e)=>{handleInputChange(e.target.value,'search')}} onKeyDown={(e) => {
              if (e.key==='Enter'){
                e.preventDefault();
                handleSearchEvent(false);
              }
            }}
          />
        </div>
        <button type='button' style={{color: buttonTextColor}} className='search-button' onClick={()=>{handleSearchEvent(false)}}>Search</button>
        <button type='button' style={{color: buttonTextColor}} className='lucky-button' onClick={()=>{handleSearchEvent(true)}}>I'm Feeling Lucky</button>
        <img className='loading' style={{display: resultBrowser.getLoadingImgStyle()}} src={loadingImg} alt='spinning circle indicating loading' />
      </form>
    </section>
  )
};