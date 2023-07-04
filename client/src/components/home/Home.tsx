import React, {useState} from 'react';
import PackageSearch from '../packageSearch/PackageSearch';
import Results from '../results/Results';
import './Home.css';
export default function Home(){
  const [allResults,setAllResults]:any = useState([]);
  const [lastSearchTerm,setLastSearchTerm] = useState('');
  const [loadingDisplay,setLoadingDisplay] = useState('none');
  const [currentPage,setCurrentPage] = useState(0);
  return(
    <main className='home'>
      <PackageSearch
      setAllResults={setAllResults} 
      setLastSearchTerm={setLastSearchTerm} 
      loadingDisplay={loadingDisplay} 
      setLoadingDisplay={setLoadingDisplay} 
      setCurrentPage={setCurrentPage}
      />
      <Results 
      allResults={allResults} 
      lastSearchTerm={lastSearchTerm} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      />
    </main>
  )
}