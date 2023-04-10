import React from 'react';
import {useLocation, useParams} from 'react-router-dom';

export default function Package(){
  const location = useLocation();
  const pkgName = useParams().pkgName;
  let pkgData = getPkgData(location.state.searchResults.allResults,pkgName);
  pkgData.archUrl = `https://archlinux.org/packages/${pkgData.repo}/${pkgData.arch}/${pkgData.pkgname}`;
  pkgData.maintainers.join(', ')
  pkgData.licenses.join(', ')
  console.log(pkgData);
  return (
    <div className='package'>
      <div className='package-title'>{pkgName}</div>
      <form className='package-details'>
        <div>
          <label>Architecture:</label>
          <span>{pkgData.arch}</span>
        </div>
        <div>
          <label>Repository:</label>
          <span>{pkgData.repo}</span>
        </div>
        <div>
          <label>Description:</label>
          <span>{pkgData.description}</span>
        </div>
        <div>
          <label>Upstream URL:</label>
          <a href={pkgData.url}>{pkgData.url}</a>
        </div>
        <div>
          <label>Archlinux.org URL:</label>
          <a href={pkgData.archUrl}>{pkgData.archUrl}</a>
        </div>
        <div>
          <label>License(s):</label>
          <span>{pkgData.licenses}</span>
        </div>
        <div>
          <label>Maintainers:</label>
          <span>{pkgData.maintainers}</span>
        </div>
        <div>
          <label>Package Size:</label>
          <span>{pkgData.compressed_size}</span>
        </div>
        <div>
          <label>Installed Size:</label>
          <span>{pkgData.installed_size}</span>
        </div>
        <div>
          <label>Last Packager:</label>
          <span>{pkgData.packager}</span>
        </div>
        <div>
          <label>Build Date:</label>
          <span>{pkgData.build_date}</span>
        </div>
        <div>
          <label>Signed By:</label>
          <span>{pkgData.packager}</span>
        </div>
        <div>
          <label>Signature Date:</label>
          <span>{pkgData.last_update}</span>
        </div>
        <div>
          <label>Last Updated:</label>
          <span>{pkgData.last_update}</span>
        </div>
        <div>
          <label>Flag Date:</label>
          <span>{pkgData.flag_date}</span>
        </div>
      </form>
      <ul className='dependencies'>
        <div className='pkg-title'>Dependencies: ({pkgData.depends.length}) Packages</div>
        {
          pkgData.depends.map((item)=>{
            return(<li>{item}</li>)
          })
        }
      </ul>
      <ul className='opt-dependencies'>
        <div className='pkg-title'>Optional Dependencies: ({pkgData.optdepends.length}) Packages</div>
        {
          pkgData.optdepends.map((item)=>{
            return(<li>{item}</li>)
          })
        }
      </ul>
    </div>
  );  
}

let getPkgData = function(allResults,pkgName){
  let pkgData = null;
  allResults.forEach((result)=>{
    if (result.pkgname===pkgName){
      pkgData=result;
    };
  });
  return pkgData;
};