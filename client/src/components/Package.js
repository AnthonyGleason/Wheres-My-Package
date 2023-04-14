import React,{useEffect, useState} from 'react';
import {useParams,useLocation} from 'react-router-dom'
import { v4 as uuidGen } from 'uuid';
import '../styles/Package.css';

export default function Package(){
  const pkgname = useParams().pkgname;
  const [currentPackage,setCurrentPackage] = useState();
  const location = useLocation();
  let allResults = location.state.allResults;
  useEffect(()=>{
    setCurrentPackage(getCurrentPackage(pkgname,allResults));
  },[]);
  if (!currentPackage){
    return(<></>);
  }else if (currentPackage.repo.toLowerCase()==='aur'){
    return(<></>);
  }else{
    return(
      <div className='package'>
        <div className='package-title'>{currentPackage.pkgname}</div>
        <ul className='package-content'>
          <li>
            <span>Architecture:</span>
            <span>{currentPackage.arch}</span>
          </li>
          <li>
            <span>Repository:</span>
            <span>{currentPackage.repo}</span>
          </li>
          <li>
            <span>Description:</span>
            <span>{currentPackage.pkgdesc}</span>
          </li>
          <li>
            <span>Package Size:</span>
            <span>{currentPackage.compressed_size}</span>
          </li>
          <li>
            <span>Installed Size:</span>
            <span>{currentPackage.installed_size}</span>
          </li>
          <li>
            <span>Upstream Url:</span>
            <a href={currentPackage.url}>{currentPackage.url}</a>
          </li>
          <li>
            <span>Archlinux.org Url:</span>
            <a href={currentPackage.archUrl}>{currentPackage.archUrl}</a>
          </li>
          <li>
            <span>Licenses:</span>
            <span>{currentPackage.licenses}</span>
          </li>
          <li>
            <span>Maintainers:</span>
            <span>{currentPackage.maintainers}</span>
          </li>
          <li>
            <span>Last Packager:</span>
            <span>{currentPackage.packager}</span>
          </li>
          <li>
            <span>Last Updated:</span>
            <span>{currentPackage.last_update}</span>
          </li>
          <li>
            <span>Flag Date:</span>
            <span>{currentPackage.flag_date}</span>
          </li>
        </ul>
        <div className='dependencies-container'>
          <ul className='depends'>
            <li>Dependencies:</li>
            {
              currentPackage.depends.map((item)=>{
                return(<li key={uuidGen()}>{item}</li>)
              })
            }
          </ul>
          <ul className='opt-depends'>
            <li>Optional Dependencies:</li>
            {
              currentPackage.optdepends.map((item)=>{
                return(<li key={uuidGen()}>{item}</li>)
              })
            }
          </ul>
        </div>
      </div>
    )
  }
};

let getCurrentPackage = function(pkgname,allResults){
  let temppkg;
  allResults.forEach((result)=>{
    if (result.pkgname===pkgname) temppkg=result;
  })
  return temppkg;
};