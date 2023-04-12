// should be able to sort, arch/repo/name/lastUpdated/flagDate

import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {v4 as uuidGen} from 'uuid';
import ResultsFooter from './ResultsFooter';
import ResultsPackage from './ResultsPackage';

export default function Results(){
  const location = useLocation();
  const state = location.state;
  //destructure state, pkgResults has both an exactMatch and results property
  const {pkgName,searchResults} = state;
  const navigate = useNavigate();
  //setup current page
  const resultsPerPage=20;
  const [currentPage,setCurrentPage] = useState(1);
  //snip array to current page selection which is the current calculated page * 20
  const arrSnip = searchResults.allResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
  //dividing by 20 because we are showing 20 results per page. additionally uses Math.ceil to round up to the nearest int (we can't have half a page)
  const totalPages = Math.ceil(searchResults.allResults.length / resultsPerPage);
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
        arrSnip.map((result)=>{
          if (searchResults.exactMatch.pkgname!==result.pkgname){
            return(
              <div key={uuidGen()} onClick={()=>{handlePackagePress(navigate,searchResults,result.pkgname)}}>
                <ResultsPackage result={result} />
              </div>
            );
          }
        })
      }
      <ResultsFooter currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  )
};
/*
  -make a page navigation component and pass the current page to it
  -display 25 results per page
  -should display a max of 9 pages at once in navigation
  -need a next and previous button to go forward and back in pages
  -go one page up or down at a time if the last or first is selected
*/
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