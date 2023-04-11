// should be able to sort, arch/repo/name/lastUpdated/flagDate

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
      <ResultsPackage result={{
        arch: 'CPU Architecture',
        repo: 'Repository',
        pkgname: 'Package Name',
        pkgver: 'Package Version',
        pkgdesc: 'Package Descrption',
        last_update: 'Last Updated Date',
        flag_date: 'Flag Date',
      }} />
      {showExactMatch(searchResults,navigate,pkgName)}
      {
        searchResults.allResults.map((result)=>{
          if (searchResults.exactMatch.pkgname!==result.pkgname){
            return(
              <div key={uuidGen()} onClick={()=>{handlePackagePress(navigate,searchResults,result.pkgname)}}>
                <ResultsPackage result={result} />
              </div>
            );
          }
        })
      }
    </div>
  )
};

let showExactMatch = function(searchResults,navigate,pkgName){
  if (!searchResults.exactMatch){
    return(<></>)
  }else{
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