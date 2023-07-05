import { Package } from "../../interfaces/interfaces";

export default function ResultsNav({currentPage,setCurrentPage,totalPages,allResults,lastSearchTerm}:any){
  const handlePageChange = function(modifier:any){
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
  };
  return(
    <nav className='results-nav'>
      <h5 className='results-nav-title'>{getResultsLength(allResults)} matching packages found for "{lastSearchTerm}". Page {currentPage} of {totalPages}</h5>
      <ul className='results-nav-buttons'>
        <li><button onClick={()=>{handlePageChange(-1)}}>{'Prev'}</button></li>
        <li><button onClick={()=>{handlePageChange(1)}}>{'Next'}</button></li>
      </ul>
    </nav>
  )
};

export const getResultsLength = function(results:Package[]):number{
  if (results){
    return results.length;
  }else{
    return 0;
  }
}