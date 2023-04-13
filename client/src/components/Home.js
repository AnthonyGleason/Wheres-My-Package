import React, {useEffect, useState} from 'react';
import PackageSearch, { handleSearch } from './PackageSearch';
import Results from './Results';
import '../styles/Home.css';
export default function Home(){
  const [allResults,setAllResults] = useState([]);
  const [lastSearchTerm,setLastSearchTerm] = useState('python');
  const [loadingDisplay,setLoadingDisplay] = useState('none');
  useEffect(()=>{
    handleSearch('any','any','python',setAllResults,setLastSearchTerm,setLoadingDisplay);
  },[]);
  return(
    <div className='home'>
      <PackageSearch allResults={allResults} setAllResults={setAllResults} setLastSearchTerm={setLastSearchTerm} loadingDisplay={loadingDisplay} setLoadingDisplay={setLoadingDisplay} />
      <Results allResults={allResults} lastSearchTerm={lastSearchTerm} />
    </div>
  )
}