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
      <div className='pkg-last-updated'>{formatDate(result.last_update)}</div>
      <div className='pkg-flag-date'>{formatDate(result.flag_date)}</div>
    </div>
  )
};

let formatDate = function(date){
  //if the date is empty return an empty string
  if (!date) return '';
  //create a new date with the date input
  let formattedDate = new Date(date)
  //format the date to "month day,year"
  .toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric'});
  return formattedDate;
};