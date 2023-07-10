import {useEffect,useState} from 'react';
import './Results.css';
import ResultItem from '../resultItem/ResultItem';
import ResultsNav from '../resultsNav/ResultsNav';
import { v4 as uuidGen } from 'uuid';
import { Package } from '../../interfaces/interfaces';
import { PackageBrowser } from '../../classes/PackageBrowser';

export default function Results({packageBrowser,}:{packageBrowser:PackageBrowser}){
  //the results snip is a current selection of packages based on the current page
  const [resultsSnip,setResultsSnip] = useState<Package[]>([]);
  //current page is used to generate a results snip,
  const [currentPage,setCurrentPage] = useState<number>(packageBrowser.currentPage);

  //create a snippet when the currentPage is updated
  useEffect(()=>{
    setResultsSnip(packageBrowser.getResultsSnip());
  },[currentPage,packageBrowser.searchQuery.results]);

  return(
    <section className='results'>
      <ResultsNav packageBrowser={packageBrowser} setCurrentPage={setCurrentPage} />
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
              resultClass={packageBrowser.getResultClass(result)}
            />
          ))
        }
      </main>
      <ResultsNav packageBrowser={packageBrowser} setCurrentPage={setCurrentPage} />
    </section>
  )
}