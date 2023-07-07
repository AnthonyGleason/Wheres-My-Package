//import components
import PackageSearchBar from '../packageSearchBar/PackageSearchBar';
import Results from '../results/Results';
//import styling
import './Home.css';
import { ResultBrowser } from '../../classes/ResultBrowser';
import { useState } from 'react';
import { Package } from '../../interfaces/interfaces';

export default function Home({resultBrowser}:{resultBrowser:ResultBrowser}){
  //if results exist the results component will be show to the user
  const [results,setResults] = useState<Package[]>();
  return(
    <main className='home'>
      <PackageSearchBar resultBrowser={resultBrowser} setResults={setResults} />
      {results && <Results resultBrowser={resultBrowser} results={results} />} 
    </main>
  )
}