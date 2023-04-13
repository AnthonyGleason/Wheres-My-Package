import React, {useEffect, useState} from 'react';
import PackageSearch, { handleSearch } from './PackageSearch';
import Results from './Results';
import '../styles/Home.css';
export default function Home(){
  const [allResults,setAllResults] = useState([]);
  useEffect(()=>{
    handleSearch('any','any','systemd',setAllResults);
  },[]);
  return(
    <div className='home'>
      <PackageSearch allResults={allResults} setAllResults={setAllResults} />
      <Results allResults={allResults} />
    </div>
  )
}