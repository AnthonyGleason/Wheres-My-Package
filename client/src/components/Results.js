import React from 'react';
import {useLocation} from 'react-router-dom';
import ResultsPackage from './ResultsPackage';
export default function Results(){
  const location = useLocation();
  const state = location.state;
  //destructure state, pkgResults has both an exactMatch and results property
  const {pkgName,searchResults} = state;
  console.log(searchResults);
  return(
    <div className='results'>
      <div>{searchResults.allResults.length} matches found for '{pkgName}'.</div>
      <div className='result'>
        <div className='pkg-arch'>CPU Architecture</div>
        <div className='pkg-repo'>Repository</div>
        <div className='pkg-name'>Package Name</div>
        <div className='pkg-version'>Package Version</div>
        <div className='pkg-description'>Package Descrption</div>
        <div className='pkg-last-updated'>Last Updated</div>
        <div className='pkg-flag-date'>Flag Date</div>
      </div>
      {showExactMatch(searchResults)}
      {
        searchResults.allResults.map((result)=>{
          /*
            if search results are an exact match to the pkgname do nothing.
            this is so the exact match is not shown twice to the user on first load.
            the array remains unmodified in case the user wants to change the way the order their search data
            is shown through filters and sorting methods.
          */
          if (result.pkgname===searchResults.exactMatch.pkgname){
            
          }else{
            return(<ResultsPackage key={result.installed_size} result={result} />);
          }
        })
      }
    </div>
  )
}

let showExactMatch = function(searchResults){
  if (!searchResults.exactMatch){
    return(<></>)
  }
  else{
    console.log()
    return(
    <div className='exact-match'>
      <div>Exact match for {searchResults.exactMatch.pkgname}:</div>
      <ResultsPackage result={searchResults.exactMatch} />
    </div>)
  }
}