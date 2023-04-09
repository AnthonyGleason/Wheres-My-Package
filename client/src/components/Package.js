import React from 'react';
import {useLocation} from 'react-router-dom';

export default function Package(){
  const location = useLocation();
  const pkgResults = location.state;
  console.log(pkgResults);
  return(
    <div className='package'>
      package
    </div>
  )
}