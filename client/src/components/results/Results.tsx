import {useState,useEffect} from 'react';
import './Results.css';
import ResultItem from '../resultItem/ResultItem';
import { v4 as uuidGen } from 'uuid';
import ResultsNav from '../resultsNav/ResultsNav';
import { Package } from '../../interfaces/interfaces';
import { ResultBrowser } from '../../classes/ResultBrowser';

export default function Results({resultBrowser}:{resultBrowser:ResultBrowser}){
  //returns a selection of the allResults array depending on the total pages and results per page
  useEffect(()=>{
    //if results have been found get the current selection of results for the current page and assign them to the resultsSnip state
    if (resultBrowser.searchQuery.results){
      resultBrowser.getResultsSnip();
    };
  },[resultBrowser.searchQuery.results,resultBrowser.currentPage]);
  
  return(
    <section className='results'>
      <ResultsNav resultBrowser={resultBrowser} />
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
        {resultBrowser.resultsSnip.map((result:Package)=>{
          const getResultClass = function():string{
            //alternate background colors by adding results-alt-item class to every other item
            if (resultBrowser.resultsSnip.indexOf(result)%2===1){
              return 'result results-alt-item';
            }else{
              return 'result';
            }
          };
          //resultClass is a string which contains the full class for the result
          const resultClass:string=getResultClass();
          return(
            <ResultItem result={result} resultClass={resultClass} resultBrowser={resultBrowser} />
          )
        })}
      </main>
      <ResultsNav resultBrowser={resultBrowser} />
    </section>
  )
}