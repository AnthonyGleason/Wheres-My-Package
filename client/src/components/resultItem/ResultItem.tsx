import { useNavigate } from 'react-router-dom';
import { Package } from '../../interfaces/interfaces';

export default function ResultItem({
    resultClass,
    arch,
    repo,
    pkgname,
    pkgver,
    pkgdesc,
    last_update,
    flag_date,
    allResults
  }:{
    resultClass: string,
    arch: string,
    repo: string,
    pkgname: string,
    pkgver: string,
    pkgdesc: string,
    last_update: string,
    flag_date: string,
    allResults: Package[]
  }){
  const navigate = useNavigate();
  return(
    <section onClick={()=>{navigate(`/package/${pkgname}`,{'state': {allResults}})}} className={resultClass}>
      <p className='pkg-arch'>{arch}</p>
      <p className='pkg-repo'>{repo}</p>
      <p className='pkg-name'>{pkgname}</p>
      <p className='pkg-version'>{pkgver}</p>
      <p className='pkg-description'>{pkgdesc}</p>
      <p className='pkg-last-updated'>{last_update}</p>
      <p className='pkg-flag-date'>{flag_date}</p>
    </section>
  )
}

