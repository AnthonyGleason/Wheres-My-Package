import { Package } from '../../interfaces/interfaces';
import {useNavigate} from 'react-router-dom'

export default function ResultItem({result,resultClass}:{result: Package,resultClass:string}){
  const navigate = useNavigate();
  return(
    <section className={resultClass} onClick={()=>{navigate(`/package/${result.pkgname}`)}}>
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

