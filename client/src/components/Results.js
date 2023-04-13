import React,{useState,useEffect} from 'react';
import '../styles/Results.css';
import Result from '../components/Result.js';
import { v4 as uuidGen } from 'uuid';
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
      <div className='results-nav'>
        <div className='results-nav-title'>{allResults.length} matching packages found for {lastSearchTerm}. Page {currentPage} of {totalPages}</div>
        <ul className='results-nav-buttons'>
          <li><button onClick={()=>{handlePageChange(currentPage,setCurrentPage,-1,totalPages)}}>{'< Prev'}</button></li>
          <li><button onClick={()=>{handlePageChange(currentPage,setCurrentPage,1,totalPages)}}>{'Next >'}</button></li>
        </ul>
      </div>
      <div className='results-content'>
        <div className='result'>
          <div className='pkg-arch'>CPU Architecture</div>
          <div className='pkg-repo'>Repository</div>
          <div className='pkg-name'>Package Name</div>
          <div className='pkg-version'>Package Version</div>
          <div className='pkg-description'>Package Description</div>
          <div className='pkg-last-updated'>Last Updated Date</div>
          <div className='pkg-flag-date'>Flag Date</div>
        </div>
        {resultsSnip.map((result)=>{
          return(
            <Result key={uuidGen()} arch={result.arch} repo={result.repo} name={result.pkgname} version={result.pkgver} description={result.pkgdesc} lastUpdated={result.last_update} flagDate={result.flag_date} />
          )
        })}
      </div>
    </div>
  )
}
let handlePageChange = function(currentPage,setCurrentPage,modifier,totalPages){
  let nextPage = 1;
  if (modifier===-1){
    nextPage = currentPage-1;
  }else if (modifier===1){
    nextPage = currentPage+1;
  }else{
    nextPage = currentPage;
  }
  if (nextPage && nextPage<=totalPages){
    setCurrentPage(nextPage);
  }
}