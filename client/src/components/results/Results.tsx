import {useState,useEffect} from 'react';
import './Results.css';
import Result from '../result/Result';
import { v4 as uuidGen } from 'uuid';
import ResultsHeading from '../resultsHeading/ResultsHeading';
export default function Results({allResults,lastSearchTerm,currentPage,setCurrentPage}){
  //Results snip refers to the current selection of results. for example page 5 will have a resultsSnip of the data for results #125-#150.
  const [resultsSnip,setResultsSnip] = useState([]);
  const [totalPages,setTotalPages] = useState(1);
  const resultsPerPage = 25;
  useEffect(()=>{
    setTotalPages(Math.ceil(allResults.length/resultsPerPage));
    setResultsSnip(allResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage));
  },[allResults,currentPage,resultsPerPage])
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
        {resultsSnip.map((result)=>{
          let tempClass='';
          //alternate background colors by adding results-alt-item class to every other item
          if (resultsSnip.indexOf(result)%2===1){
            tempClass='result results-alt-item';
          }else{
            tempClass='result'
          }
          return(
            <Result 
            tempClass={tempClass} 
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