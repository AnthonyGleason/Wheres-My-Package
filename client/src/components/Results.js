import React,{useState,useEffect} from 'react';
import '../styles/Results.css';
import Result from '../components/Result.js';
import { v4 as uuidGen } from 'uuid';
import ResultsHeading from './ResultsHeading';
export default function Results({allResults,lastSearchTerm}){
  const [resultsSnip,setResultsSnip] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [resultsPerPage,setResultsPerPage] = useState(25);
  useEffect(()=>{
    setTotalPages(Math.ceil(allResults.length/resultsPerPage));
    setResultsSnip(allResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage));
  },[allResults,currentPage,resultsPerPage])
  return(
    <div className='results'>
      <ResultsHeading currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} allResults={allResults} lastSearchTerm={lastSearchTerm} />
      <div className='results-content'>
        <div className='result-labels'>
          <div className='pkg-arch'>CPU Architecture</div>
          <div className='pkg-repo'>Repository</div>
          <div className='pkg-name'>Package Name</div>
          <div className='pkg-version'>Package Version</div>
          <div className='pkg-description'>Package Description</div>
          <div className='pkg-last-updated'>Last Updated Date</div>
          <div className='pkg-flag-date'>Flag Date</div>
        </div>
        {resultsSnip.map((result)=>{
          let tempClass='result';
          if (resultsSnip.indexOf(result)%2===1){
            tempClass=tempClass+' results-alt-item';
          }
          return(
            <Result tempClass={tempClass} key={uuidGen()} arch={result.arch} repo={result.repo} name={result.pkgname} version={result.pkgver} description={result.pkgdesc} lastUpdated={result.last_update} flagDate={result.flag_date} />
          )
        })}
      </div>
      <ResultsHeading currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} allResults={allResults} lastSearchTerm={lastSearchTerm} />
    </div>
  )
}