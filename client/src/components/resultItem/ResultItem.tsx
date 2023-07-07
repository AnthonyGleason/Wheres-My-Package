import { Package } from '../../interfaces/interfaces';

export default function ResultItem({result,resultClass}:{result: Package,resultClass:string}){
  return(
    <section className={resultClass}>
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

