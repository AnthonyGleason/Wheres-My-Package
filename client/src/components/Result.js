import React from 'react';

export default function Result({arch,repo,name,version,description,lastUpdated,flagDate}){
  return(
    <div className='result'>
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