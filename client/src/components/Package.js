import React from 'react';
import {useLocation} from 'react-router-dom';

export default function Package(){
  const location = useLocation();
  const pkgData = location.state;
  console.log(pkgData);
  return(
    <div className='package'>
      package
    </div>
  )
}