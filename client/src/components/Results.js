import React, {useState} from 'react';
import {useLocation, useNavigate, useResolvedPath, useRoutes} from 'react-router-dom';
import {v4 as uuidGen} from 'uuid';
import ResultsFooter from './ResultsFooter';
import ResultsPackage from './ResultsPackage';
import '../styles/Results.css'
export default function Results(){
  const location = useLocation();
  const state = location.state;
  //destructure state, pkgResults has both an exactMatch and results property
  const {pkgName,searchResults} = state;
  const [searchRes,setSearchRes] = useState(searchResults);
  const navigate = useNavigate();
  //setup current page
  const resultsPerPage=20;
  const [currentPage,setCurrentPage] = useState(1);
  //snip array to current page selection which is the current calculated page * 20
  const arrSnip = searchRes.allResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
  //dividing by 20 because we are showing 20 results per page. additionally uses Math.ceil to round up to the nearest int (we can't have half a page)
  const totalPages = Math.ceil(searchRes.allResults.length / resultsPerPage);

  //sorting states
  const [archOrder,setArchOrder] = useState('inorder');
  const [repoOrder,setRepoOrder] = useState('inorder');
  const [pkgNameOrder,setPkgNameOrder] = useState('inorder');
  const [pkgVersionOrder,setPkgVersionOrder] = useState('inorder');
  const [pkgDescOrder,setPkgDescOrder] = useState('inorder');
  return(
    <div className='results'>
      <div>{searchRes.allResults.length} match(es) found for '{pkgName}'.</div>
      {/* column labels */}
      <div className='result'>
        <div className='pkg-arch pointer' onClick={()=>{sortData(searchRes,setSearchRes,'arch',archOrder,setArchOrder)}}>CPU Architecture</div>
        <div className='pkg-repo pointer' onClick={()=>{sortData(searchRes,setSearchRes,'repo',repoOrder,setRepoOrder)}}>Repository</div>
        <div className='pkg-name pointer' onClick={()=>{sortData(searchRes,setSearchRes,'pkgname',pkgNameOrder,setPkgNameOrder)}}>Package Name</div>
        <div className='pkg-version pointer' onClick={()=>{sortData(searchRes,setSearchRes,'pkgver',pkgVersionOrder,setPkgVersionOrder)}}>Package Version</div>
        <div className='pkg-description pointer' onClick={()=>{sortData(searchRes,setSearchRes,'pkgdesc',pkgDescOrder,setPkgDescOrder)}}>Package Description</div>
        <div className='pkg-last-updated pointer'>Last Updated Date</div>
        <div className='pkg-flag-date pointer'>Flag Date</div>
      </div>
      {
        arrSnip.map((result)=>{
          return(
            <div key={uuidGen()} onClick={()=>{handlePackagePress(navigate,searchRes,result.pkgname)}}>
              <ResultsPackage result={result} />
            </div>
          );
        })
      }
      <ResultsFooter currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  )
};

let handlePackagePress = function(navigate,searchRes,pkgName){
  navigate(`/package/${pkgName}`,{state: {searchRes}});
}

let sortData = function(searchRes, setSearchRes, sortBy,sortingOrder,setSortingOrder){
  //copy the search results array
  let tempRes = {...searchRes};
  //sort inorder
  if (sortingOrder==='inorder'){
    switch(sortBy){
      case 'arch':
        tempRes.allResults.sort((a,b)=>{
          if (a.arch>b.arch) return 1;
          if (a.arch<b.arch) return -1;
          if (a.arch===b.arch) return 0;
        })
        break;
      case 'repo':
        tempRes.allResults.sort((a,b)=>{
          if (a.repo>b.repo) return 1;
          if (a.repo<b.repo) return -1;
          if (a.repo===b.repo) return 0;
        })
        break;
      case 'pkgname':
        tempRes.allResults.sort((a,b)=>{
          if (a.pkgname>b.pkgname) return 1;
          if (a.pkgname<b.pkgname) return -1;
          if (a.pkgname===b.pkgname) return 0;
        })
        break;
      case 'pkgver':
        tempRes.allResults.sort((a,b)=>{
          if (a.pkgver>b.pkgver) return 1;
          if (a.pkgver<b.pkgver) return -1;
          if (a.pkgver===b.pkgver) return 0;
        })
        break;
      case 'pkgdesc':
        tempRes.allResults.sort((a,b)=>{
          if (a.pkgdesc>b.pkgdesc) return 1;
          if (a.pkgdesc<b.pkgdesc) return -1;
          if (a.pkgdesc===b.pkgdesc) return 0;
        })
        break;
      default:
        break;
    }
    //toggle sorting order to reverse so that the next time the user presses on the sorting button it reverses
    setSortingOrder('reverse');
  }
  else if (sortingOrder === 'reverse') {
    switch(sortBy){
      case 'arch':
        tempRes.allResults.sort((a,b)=>{
          if (a.arch>b.arch) return -1;
          if (a.arch<b.arch) return 1;
          if (a.arch===b.arch) return 0;
        })
        break;
      case 'repo':
        tempRes.allResults.sort((a,b)=>{
          if (a.repo>b.repo) return -1;
          if (a.repo<b.repo) return 1;
          if (a.repo===b.repo) return 0;
        })
        break;
      case 'pkgname':
        tempRes.allResults.sort((a,b)=>{
          if (a.pkgname>b.pkgname) return -1;
          if (a.pkgname<b.pkgname) return 1;
          if (a.pkgname===b.pkgname) return 0;
        })
        break;
      case 'pkgver':
        tempRes.allResults.sort((a,b)=>{
          if (a.pkgver>b.pkgver) return -1;
          if (a.pkgver<b.pkgver) return 1;
          if (a.pkgver===b.pkgver) return 0;
        })
        break;
      case 'pkgdesc':
        tempRes.allResults.sort((a,b)=>{
          if (a.pkgdesc>b.pkgdesc) return -1;
          if (a.pkgdesc<b.pkgdesc) return 1;
          if (a.pkgdesc===b.pkgdesc) return 0;
        })
        break;
      default:
        break;
    }
    setSortingOrder('inorder');
  }  
  setSearchRes(tempRes);
};