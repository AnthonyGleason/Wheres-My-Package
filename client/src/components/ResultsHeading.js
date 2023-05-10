import React from 'react';
export default function ResultsHeading({currentPage,setCurrentPage,totalPages,allResults,lastSearchTerm}){
  return(
    <nav className='results-nav'>
      <h5 className='results-nav-title'>{allResults.length} matching packages found for "{lastSearchTerm}". Page {currentPage} of {totalPages}</h5>
      <ul className='results-nav-buttons'>
        <li><button onClick={()=>{handlePageChange(currentPage,setCurrentPage,-1,totalPages)}}>{'< Prev'}</button></li>
        <li><button onClick={()=>{handlePageChange(currentPage,setCurrentPage,1,totalPages)}}>{'Next >'}</button></li>
      </ul>
    </nav>
  )
};

let handlePageChange = function(currentPage,setCurrentPage,modifier,totalPages){
  let nextPage;
  if (modifier===-1){
    nextPage = currentPage-1;
  }else if (modifier===1){
    nextPage = currentPage+1;
  }else{
    nextPage = 1;
  }
  if (nextPage && nextPage<=totalPages){
    setCurrentPage(nextPage);
  }
}