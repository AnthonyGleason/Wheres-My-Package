import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Result({tempClass,arch,repo,name,version,description,lastUpdated,flagDate,allResults}){
  const navigate = useNavigate();
  return(
    <section onClick={()=>{handleClick(name,navigate,allResults)}} className={tempClass}>
      <p className='pkg-arch'>{arch}</p>
      <p className='pkg-repo'>{repo}</p>
      <p className='pkg-name'>{name}</p>
      <p className='pkg-version'>{version}</p>
      <p className='pkg-description'>{description}</p>
      <p className='pkg-last-updated'>{lastUpdated}</p>
      <p className='pkg-flag-date'>{flagDate}</p>
    </section>
  )
}

let handleClick = function(name,navigate,allResults){
  navigate(`/package/${name}`,{state: {allResults}});
}