import { PackageBrowser } from "../../classes/PackageBrowser";

export default function ResultsNav({packageBrowser,setCurrentPage}:{packageBrowser:PackageBrowser,setCurrentPage:Function}){
  //handles the user changing the page. Accepts a modifier which modifies the current page by provided modifier argument.
  const handlePageChange = function(modifier:number):void{
    packageBrowser.handlePageChange(modifier); //handles the package change locally in the packageBrowser
    setCurrentPage(packageBrowser.currentPage); //sets the package change in state with the updated package browser page
  };

  
  
  return(
    <nav className='results-nav'>
      <h5 className='results-nav-title'>{packageBrowser.searchQuery.getResultsLength()} matching packages found for "{packageBrowser.searchQuery.term}". Page {packageBrowser.currentPage} of {packageBrowser.totalPages}</h5>
      <ul className='results-nav-buttons'>
        <li>
          <select onChange={(e) => handlePageChange(parseInt(e.target.value) - packageBrowser.currentPage)}>
            {
              packageBrowser.getPageSelectOptions()
            }
          </select>
        </li>
        <li><button onClick={()=>{handlePageChange(-1)}}>{'Prev'}</button></li>
        <li><button onClick={()=>{handlePageChange(1)}}>{'Next'}</button></li>
      </ul>
    </nav>
  )
};