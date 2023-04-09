import React from 'react';
import {useLocation} from 'react-router-dom';

export default function Results(){
  const location = useLocation();
  const state = location.state;
  //destructure state, pkgResults has both an exactMatch and results property
  const {pkgName,searchResults} = state;
  console.log(searchResults);
  return(
    <div className='results'>
      <div>Found {searchResults.allResults.length} matches for '{pkgName}':</div>
    </div>
  )
}