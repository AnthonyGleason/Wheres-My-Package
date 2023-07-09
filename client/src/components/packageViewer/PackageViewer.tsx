import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { v4 as uuidGen } from 'uuid';
import './PackageViewer.css';
import { PackageBrowser } from '../../classes/PackageBrowser';
import { Package} from '../../interfaces/interfaces';

export default function PackageViewer({packageBrowser}:{packageBrowser:PackageBrowser}){
  const pkgname = useParams().pkgname;
  const [currentPackage,setCurrentPackage]= useState<Package>();

  //this will get data from the server if a user is accessing the url without performing a search
  const getPackageData = async function(){
    if (packageBrowser.searchQuery.results.length>0 && pkgname) { //user is accessing the package from a search
      setCurrentPackage(packageBrowser.searchQuery.findResult(pkgname)); //set the current result in state finding the result with the pkgname from the route.
    }else if (pkgname){ //user is accessing the package from a link
      packageBrowser.searchQuery.term = pkgname; //set the term so a search can be performed
      await packageBrowser.searchQuery
        .getResults() //perform the search
        .then((results: Package[]) => {
          //store the results on the searchQuery
          packageBrowser.searchQuery.results = results;
          //filter the search results to the user provided constraints and set the filtered results in state
          setCurrentPackage(packageBrowser.searchQuery.filterResults()[0]);
      });
    };
  };

  useEffect(() => {
    //gets the package data for the pkgname in the route
    getPackageData();
  },[]);

  if (!currentPackage){
     //the package the user is viewing does not exist
    return(<></>);
  }else if (currentPackage.repo.toLowerCase()==='aur'){ 
    //the package the user is viewing is an aur package
    return(
      <section className='package'>
        <h2 className='package-title'>{currentPackage.pkgname}</h2>
        <ul className='package-content'>
          <li>
            <p>Attention, this is an Aur package submitted by the arch community. Its contents have not been verified.</p>
          </li>
          <li>
            <p>Architecture:</p>
            <p>{currentPackage.arch}</p>
          </li>
          <li>
            <p>Repository:</p>
            <p>{currentPackage.repo}</p>
          </li>
          <li>
            <p>Description:</p>
            <p>{currentPackage.pkgdesc}</p>
          </li>
          <li>
            <p>Upstream Url:</p>
            <a className='arch-url' href={currentPackage.url}>{currentPackage.url}</a>
          </li>
          <li>
            <p>Archlinux.org Url:</p>
            <a className='arch-url' href={currentPackage.archUrl}>{currentPackage.archUrl}</a>
          </li>
          <li>
            <p>Last Updated:</p>
            <p>{currentPackage.last_update}</p>
          </li>
          <li>
            <p>Flag Date:</p>
            <p>{currentPackage.flag_date}</p>
          </li>
          <li>
            <p>Votes:</p>
            <p>{currentPackage.votes}</p>
          </li>
        </ul>
      </section>
    )
  }else if(currentPackage.depends && currentPackage.optdepends){ 
    //if both depends and optdepends exist this package is an official arch package
    return(
      <div className='package'>
        <div className='package-title'>{currentPackage.pkgname}</div>
        <ul className='package-content'>
          <li>
            <h4>Architecture:</h4>
            <p>{currentPackage.arch}</p>
          </li>
          <li>
            <h4>Repository:</h4>
            <p>{currentPackage.repo}</p>
          </li>
          <li>
            <h4>Description:</h4>
            <p>{currentPackage.pkgdesc}</p>
          </li>
          <li>
            <h4>Package Size:</h4>
            <p>{currentPackage.compressed_size}</p>
          </li>
          <li>
            <h4>Installed Size:</h4>
            <p>{currentPackage.installed_size}</p>
          </li>
          <li>
            <h4>Upstream Url:</h4>
            <a className='arch-url' href={currentPackage.url}>{currentPackage.url}</a>
          </li>
          <li>
            <h4>Archlinux.org Url:</h4>
            <a className='arch-url' href={currentPackage.archUrl}>{currentPackage.archUrl}</a>
          </li>
          <li>
            <h4>Licenses:</h4>
            <p>{currentPackage.licenses}</p>
          </li>
          <li>
            <h4>Maintainers:</h4>
            <p>{currentPackage.maintainers}</p>
          </li>
          <li>
            <h4>Last Packager:</h4>
            <p>{currentPackage.packager}</p>
          </li>
          <li>
            <h4>Last Updated:</h4>
            <p>{currentPackage.last_update}</p>
          </li>
          <li>
            <h4>Flag Date:</h4>
            <p>{currentPackage.flag_date}</p>
          </li>
        </ul>
        <section className='dependencies-container'>
          <ul className='depends'>
            <li>Dependencies:</li>
            {
              currentPackage.depends.map((item:any)=>{
                return(<li key={uuidGen()}>{item}</li>)
              })
            }
          </ul>
          <ul className='opt-depends'>
            <li>Optional Dependencies:</li>
            {
              currentPackage.optdepends.map((item:any)=>{
                return(<li key={uuidGen()}>{item}</li>)
              })
            }
          </ul>
        </section>
      </div>
    )
  }else{
    return(<></>);
  }
};