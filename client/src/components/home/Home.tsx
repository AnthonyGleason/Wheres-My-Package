import {useState} from 'react';
//import components
import PackageSearchBar from '../packageSearchBar/PackageSearchBar';
import Results from '../results/Results';
//import styling
import './Home.css';
import { Package } from '../../interfaces/interfaces';
export default function Home(){
  //holds all of the results returned the server on the last search performed
  const [allResults,setAllResults] = useState<Package>();
  const [lastSearchTerm,setLastSearchTerm] = useState<string>('');
  const [isLoading,setIsLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(0);
  return(
    <main className='home'>
      <PackageSearchBar
      setAllResults={setAllResults} 
      setLastSearchTerm={setLastSearchTerm} 
      isLoading={isLoading} 
      setIsLoading={setIsLoading} 
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