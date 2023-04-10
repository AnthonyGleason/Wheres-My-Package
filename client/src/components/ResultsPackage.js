import React from 'react';
import "../styles/ResultsPackage.css";
export default function ResultsPackage({result}){
  return(
    <div className='result'>
      <div className='pkg-arch'>{result.arch}</div>
      <div className='pkg-repo'>{result.repo}</div>
      <div className='pkg-name'>{result.pkgname}</div>
      <div className='pkg-version'>{result.pkgver}</div>
      <div className='pkg-description'>{result.pkgdesc}</div>
      <div className='pkg-last-updated'>{result.last_update}</div>
      <div className='pkg-flag-date'>{result.flag_date}</div>
    </div>
  )
}