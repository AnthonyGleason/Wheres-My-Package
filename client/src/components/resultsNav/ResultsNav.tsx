import { Package } from "../../interfaces/interfaces";

export default function ResultsNav({
    currentPage,
    setCurrentPage,
    totalPages,
    allResults,
    lastSearchTerm
  }:{
    currentPage:number,
    setCurrentPage: Function,
    totalPages:number,
    allResults:Package[],
    lastSearchTerm:string
  }){
  const handlePageChange = function(modifier:number):void{
    //returns the next page based on the modifier provided
    const getNextPage = function():number{
      if (modifier===-1){
        return currentPage-1;
      }else if (modifier===1){
        return currentPage+1;
      }else{
        return 1;
      }
    };
    const nextPage:number = getNextPage();
    //only update next page if the page is within valid range and a valid number
    if (nextPage && nextPage<=totalPages){
      setCurrentPage(nextPage);
    };
  };
  const getResultsLength = function():number{
    if (allResults){
      return allResults.length;
    }else{
      return 0;
    }
  };
  return(
    <nav className='results-nav'>
      <h5 className='results-nav-title'>{getResultsLength()} matching packages found for "{lastSearchTerm}". Page {currentPage} of {totalPages}</h5>
      <ul className='results-nav-buttons'>
        <li><button onClick={()=>{handlePageChange(-1)}}>{'Prev'}</button></li>
        <li><button onClick={()=>{handlePageChange(1)}}>{'Next'}</button></li>
      </ul>
    </nav>
  )
};
