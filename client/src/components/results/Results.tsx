import {useEffect,useState} from 'react';
import './Results.css';
import ResultItem from '../resultItem/ResultItem';
import ResultsNav from '../resultsNav/ResultsNav';
import { v4 as uuidGen } from 'uuid';
import { Package } from '../../interfaces/interfaces';
import { ResultBrowser } from '../../classes/ResultBrowser';

export default function Results({resultBrowser,results}:{resultBrowser:ResultBrowser, results:Package[]}){
  const [resultsSnip,setResultsSnip] = useState<Package[]>([]);

  //create a snippet
  useEffect(()=>{
    setResultsSnip(resultBrowser.getResultsSnip());
  },[results,resultBrowser.currentPage]);

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
        {
          resultsSnip.map((result: Package) => (
            <ResultItem
              key={uuidGen()}
              result={result}
              resultClass={resultBrowser.getResultClass(result)}
            />
          ))
        }
      </main>
      <ResultsNav resultBrowser={resultBrowser} />
    </section>
  )
}