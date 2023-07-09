import './PackageSearchBar.css';
import { useState } from 'react';
import loadingImg from '../../assets/loading.svg';
import { PackageBrowser } from '../../classes/PackageBrowser';
import { Package } from '../../interfaces/interfaces';

export default function PackageSearchBar({packageBrowser,setResults}:{packageBrowser:PackageBrowser,setResults:Function}){
  //this state stores the user selected filter for the architecture of the package for example 'any' or 'x86_64'
  const [archInput,setArchInput] = useState<string>(packageBrowser.searchQuery.archInput);
  //this state stores the user selected filter for repository to query
  const [repoInput,setRepoInput] = useState<string>(packageBrowser.searchQuery.repoInput);
  //this state stores the user inputted search term
  const [searchInput,setSearchInput] = useState<string>(packageBrowser.searchQuery.searchInput);
  //this state stores the color of the search and lucky button
  const [buttonTextColor,setButtonTextColor] = useState<string>(packageBrowser.getButtonTextColor());
  //the user is submitting a request for a search
  const handleSearchEvent = async function(isLucky:boolean){
    //the user is submitting a lucky search
    if (isLucky){
      packageBrowser.searchQuery.setLuckyTerm();
    }else{
      //otherwise set the search input as the search term
      packageBrowser.searchQuery.term = packageBrowser.searchQuery.searchInput;
    }
    //lock the buttons so users cannot send more than 1 search at a time
    packageBrowser.lockSearch()
    //set button text color to a greyed out color
    setButtonTextColor(packageBrowser.getButtonTextColor());
    //get search results
    await packageBrowser.searchQuery
      .getResults()
      .then((results:Package[])=>{
        //store the search results in the searchQuery class
        packageBrowser.searchQuery.results = results;
        //filter the search results to the user provided constraints
        setResults(packageBrowser.searchQuery.filterResults());
        //if there are results set the current page to 1 (this is needed to the results snip for the page can be generated)
        if (packageBrowser.searchQuery.results) packageBrowser.currentPage=1;
        //enable the search button for the user
        packageBrowser.unlockSearch();
        //set the button text color back to its enabled color
        setButtonTextColor(packageBrowser.getButtonTextColor());
    });
  };
  //takes in an input and input type, this function will set assign the input in state based on the type provided
  const handleInputChange = function(input:string,inputType:string){
    const tempInput:string = input;
    switch(inputType){
      case 'arch':
        //store the input in the packageBrowser class
        packageBrowser.setInput('arch',tempInput);
        //set the input in state
        setArchInput(tempInput);
        break;
      case 'repo':
        packageBrowser.setInput('repo',tempInput);
        setRepoInput(tempInput);
        break;
      case 'search':
        packageBrowser.setInput('search',tempInput);
        setSearchInput(tempInput);
        break;
      default:
        //do nothing if the inputType doesn't match any of the cases
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
            <option>Aur</option>
            <option>Community</option>
            <option>Community-Testing</option>
            <option>Core</option>
            <option>Extra</option>
            <option>Extra-Testing</option>
            <option>KDE-Unstable</option>
            <option>Multilib</option>
            <option>Multilib-Testing</option>
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
        <img className='loading' style={{display: packageBrowser.getLoadingImgStyle()}} src={loadingImg} alt='spinning circle indicating loading' />
      </form>
    </section>
  )
};