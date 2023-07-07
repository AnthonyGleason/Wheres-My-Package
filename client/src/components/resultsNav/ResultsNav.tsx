import { ResultBrowser } from "../../classes/ResultBrowser";

export default function ResultsNav({resultBrowser,setCurrentPage}:{resultBrowser:ResultBrowser,setCurrentPage:Function}){
  const handlePageChange = function(modifier:number){
    resultBrowser.handlePageChange(modifier)
    setCurrentPage(resultBrowser.currentPage);
  };

  return(
    <nav className='results-nav'>
      <h5 className='results-nav-title'>{resultBrowser.getResultsLength()} matching packages found for "{resultBrowser.searchQuery.term}". Page {resultBrowser.currentPage} of {resultBrowser.totalPages}</h5>
      <ul className='results-nav-buttons'>
        <li><button onClick={()=>{handlePageChange(-1)}}>{'Prev'}</button></li>
        <li><button onClick={()=>{handlePageChange(1)}}>{'Next'}</button></li>
      </ul>
    </nav>
  )
};
