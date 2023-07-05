import {useState,useEffect} from 'react';
import './Results.css';
import ResultItem from '../resultItem/ResultItem';
import { v4 as uuidGen } from 'uuid';
import ResultsHeading from '../resultsNav/ResultsNav';
import { Package } from '../../interfaces/interfaces';
import { resultsPerPage } from '../../clientSettings';
export default function Results({allResults,lastSearchTerm,currentPage,setCurrentPage}:any){
  //Results snip refers to the current selection of results. for example page 5 will have a resultsSnip of the data for results #125-#150.
  const [resultsSnip,setResultsSnip] = useState<Package[]>([]);
  //the total number of pages of search results for the search
  const [totalPages,setTotalPages] = useState<number>(0);
  //returns a selection of the allResults array depending on the total pages and results per page
  const getResultsSnip = function():Package[]{
    //set the total number of pages rounding the page
    const totalPages:number = Math.ceil(allResults.length/resultsPerPage);
    setTotalPages(totalPages);
    if (totalPages>0){
      return allResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
    }else{
      return [];
    };
  };
  useEffect(()=>{
    if (allResults){
      setResultsSnip(getResultsSnip());
    };
  },[allResults,currentPage])
  return(
    <section className='results'>
      <ResultsHeading
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      totalPages={totalPages} 
      allResults={allResults} 
      lastSearchTerm={lastSearchTerm} 
      />
      <main className='results-content'>
        <div className='result-labels'>
          <h5 className='pkg-arch'>CPU Architecture</h5>
          <h5 className='pkg-repo'>Repository</h5>
          <h5 className='pkg-name'>Package Name</h5>
          <h5 className='pkg-version'>Package Version</h5>
          <h5 className='pkg-description'>Package Description</h5>
          <h5 className='pkg-last-updated'>Last Updated Date</h5>
          <h5 className='pkg-flag-date'>Flag Date</h5>
        </div>
        {resultsSnip.map((result:Package)=>{
          const getResultClass = function():string{
            //alternate background colors by adding results-alt-item class to every other item
            if (resultsSnip.indexOf(result)%2===1){
              return 'result results-alt-item';
            }else{
              return 'result';
            }
          }
          const resultClass=getResultClass();
          return(
            <ResultItem 
            resultClass={resultClass} 
            key={uuidGen()} 
            arch={result.arch} 
            repo={result.repo} 
            name={result.pkgname} 
            version={result.pkgver} 
            description={result.pkgdesc} 
            lastUpdated={result.last_update} 
            flagDate={result.flag_date} 
            allResults={allResults}
            />
          )
        })}
      </main>
      <ResultsHeading
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      totalPages={totalPages} 
      allResults={allResults} 
      lastSearchTerm={lastSearchTerm} 
      />
    </section>
  )
}