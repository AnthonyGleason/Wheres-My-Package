export default function ResultsHeading({currentPage,setCurrentPage,totalPages,allResults,lastSearchTerm}){
  const handlePageChange = function(modifier){
    let nextPage;
    if (modifier===-1){
      nextPage = currentPage-1;
    }else if (modifier===1){
      nextPage = currentPage+1;
    }else{
      nextPage = 1;
    }
    //only update next page if the page is within valid range and a valid number
    if (nextPage && nextPage<=totalPages){
      setCurrentPage(nextPage);
    }
  }

  return(
    <nav className='results-nav'>
      <h5 className='results-nav-title'>{allResults.length} matching packages found for "{lastSearchTerm}". Page {currentPage} of {totalPages}</h5>
      <ul className='results-nav-buttons'>
        <li><button onClick={()=>{handlePageChange(-1)}}>{'Prev'}</button></li>
        <li><button onClick={()=>{handlePageChange(1)}}>{'Next'}</button></li>
      </ul>
    </nav>
  )
};

