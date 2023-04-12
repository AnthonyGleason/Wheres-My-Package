import React from 'react';
import "../styles/ResultsPackage.css";
export default function ResultsPackage({result}){
  return(
    <div className={`result ${result.repo}`}>
      <div className='pkg-arch pointer'>{result.arch}</div>
      <div className='pkg-repo pointer'>{result.repo}</div>
      <div className='pkg-name pointer'>{result.pkgname}</div>
      <div className='pkg-version pointer'>{result.pkgver}</div>
      <div className='pkg-description pointer'>{result.pkgdesc}</div>
      <div className='pkg-last-updated pointer'>{result.last_update}</div>
      <div className='pkg-flag-date pointer'>{result.flag_date}</div>
    </div>
  )
};