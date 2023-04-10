// should be able to sort, arch/name/lastUpdated/flagDate

import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {v4 as uuidGen} from 'uuid';
import ResultsPackage from './ResultsPackage';

export default function Results(){
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  //destructure state, pkgResults has both an exactMatch and results property
  const {pkgName,searchResults} = state;
  return(
    <div className='results'>
      <div>{searchResults.allResults.length} match(es) found for '{pkgName}'.</div>
      {/* column labels */}
      <div className='result'>
        <div className='pkg-arch'>CPU Architecture</div>
        <div className='pkg-repo'>Repository</div>
        <div className='pkg-name'>Package Name</div>
        <div className='pkg-version'>Package Version</div>
        <div className='pkg-description'>Package Descrption</div>
        <div className='pkg-last-updated'>Last Updated</div>
        <div className='pkg-flag-date'>Flag Date</div>
      </div>
      {showExactMatch(searchResults,navigate,pkgName)}
      {
        /*
            if search results are an exact match to the pkgname do nothing.
            this is so the exact match is not shown twice to the user on first load.
            the array remains unmodified in case the user wants to change the way the order their search data
            is shown through filters and sorting methods.
          */
        searchResults.allResults.map((result)=>{
          if (result.pkgname!==searchResults.exactMatch.pkgname){
            return(
              <div key={uuidGen()} onClick={()=>{handlePackagePress(navigate,searchResults,result.pkgname)}}>
                <ResultsPackage result={result} />
              </div>
            );
          };
        })
      }
    </div>
  )
};

let showExactMatch = function(searchResults,navigate,pkgName){
  if (!searchResults.exactMatch){
    return(<></>)
  }
  else{
    return(
    <div className='exact-match'>
      <div key={uuidGen()} onClick={()=>{handlePackagePress(navigate,searchResults,pkgName)}}>
        <ResultsPackage result={searchResults.exactMatch} />
      </div>
    </div>
    )
  }
};

let handlePackagePress = function(navigate,searchResults,pkgName){
  navigate(`/package/${pkgName}`,{state: {searchResults}});
}