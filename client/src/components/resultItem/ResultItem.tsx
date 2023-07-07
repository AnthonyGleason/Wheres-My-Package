import { useNavigate } from 'react-router-dom';
import { Package } from '../../interfaces/interfaces';
import { ResultBrowser } from '../../classes/ResultBrowser';

export default function ResultItem({result,resultClass,resultBrowser}:{result: Package,resultClass:string,resultBrowser:ResultBrowser}){
  const navigate = useNavigate();
  const results: Package[] = resultBrowser.searchQuery.results;
  return(
    <section onClick={()=>{navigate(`/package/${result.pkgname}`,{'state': {results}})}} className={resultClass}>
      <p className='pkg-arch'>{result.arch}</p>
      <p className='pkg-repo'>{result.repo}</p>
      <p className='pkg-name'>{result.pkgname}</p>
      <p className='pkg-version'>{result.pkgver}</p>
      <p className='pkg-description'>{result.pkgdesc}</p>
      <p className='pkg-last-updated'>{result.last_update}</p>
      <p className='pkg-flag-date'>{result.flag_date}</p>
    </section>
  )
}

