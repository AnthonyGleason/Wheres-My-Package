import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Result({tempClass,arch,repo,name,version,description,lastUpdated,flagDate,allResults}){
  const navigate = useNavigate();
  return(
    <div onClick={()=>{handleClick(name,navigate,allResults)}} className={tempClass}>
      <div className='pkg-arch'>{arch}</div>
      <div className='pkg-repo'>{repo}</div>
      <div className='pkg-name'>{name}</div>
      <div className='pkg-version'>{version}</div>
      <div className='pkg-description'>{description}</div>
      <div className='pkg-last-updated'>{lastUpdated}</div>
      <div className='pkg-flag-date'>{flagDate}</div>
    </div>
  )
}

let handleClick = function(name,navigate,allResults){
  navigate(`/package/${name}`,{state: {allResults}});
}