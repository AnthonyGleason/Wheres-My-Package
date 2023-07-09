//import components
import PackageSearchBar from '../packageSearchBar/PackageSearchBar';
import Results from '../results/Results';
//import styling
import './Home.css';
import { PackageBrowser } from '../../classes/PackageBrowser';
import { useState } from 'react';
import { Package } from '../../interfaces/interfaces';

export default function Home({packageBrowser}:{packageBrowser:PackageBrowser}){
  //if results exist the results component will be show to the user
  const [results,setResults] = useState<Package[]>();
  return(
    <main className='home'>
      <PackageSearchBar packageBrowser={packageBrowser} setResults={setResults} />
      {results && <Results packageBrowser={packageBrowser} />} 
    </main>
  )
}