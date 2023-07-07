//import components
import PackageSearchBar from '../packageSearchBar/PackageSearchBar';
import Results from '../results/Results';
//import styling
import './Home.css';
import { ResultBrowser } from '../../classes/ResultBrowser';

export default function Home(){
  //holds all of the results returned the server on the last search performed
  const resultBrowser = new ResultBrowser();
  return(
    <main className='home'>
      <PackageSearchBar resultBrowser={resultBrowser} />
      <Results resultBrowser={resultBrowser} />
    </main>
  )
}