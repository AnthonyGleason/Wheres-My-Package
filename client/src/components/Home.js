import React, {useEffect, useState} from 'react';
import PackageSearch, { handleSearch } from './PackageSearch';
import Results from './Results';
import '../styles/Home.css';
import getLucky from '../scripts/lucky';
export default function Home(){
  const [allResults,setAllResults] = useState([]);
  const [lastSearchTerm,setLastSearchTerm] = useState('');
  const [loadingDisplay,setLoadingDisplay] = useState('none');
  const [currentPage,setCurrentPage] = useState(0);
  return(
    <div className='home'>
      <PackageSearch allResults={allResults} setAllResults={setAllResults} setLastSearchTerm={setLastSearchTerm} loadingDisplay={loadingDisplay} setLoadingDisplay={setLoadingDisplay} setCurrentPage={setCurrentPage}/>
      <Results allResults={allResults} lastSearchTerm={lastSearchTerm} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}