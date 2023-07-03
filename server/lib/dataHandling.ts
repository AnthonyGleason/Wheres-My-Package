import {Package} from "../interfaces/interfaces";
import { Response } from "express";
//fetch search results for the search input on the main arch repositories
export const getArchResults = async function(packageName:string,res:Response):Promise<Package[]>{
  //initialize arch results with an empty array
  let archResults:Package[] = [];
  try{
    //make a request to the arch linux api looking for the search input
    let response:any = await fetch(`https://archlinux.org/packages/search/json/?q=${packageName}`,{
      method: "GET",
    });
    if (response.ok && response.headers.get('content-type').includes('application/json')){
      const archData = await response.json();
      archResults = archData.results;
    }
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the arch api`);
    res.status(500).json({'message': `Error when fetching search results for package ${packageName} in the arch api`})
  }
  return archResults;
};

//returns the first match found in allResults
export const findExactMatch = function(allResults:any,packageName:any){
  let exactMatch;
  for (let i=0;i<allResults.length;i++){
    if (allResults[i].pkgname===packageName.toLowerCase()){
      exactMatch=allResults[i];
      break;
    };
  };
  return exactMatch;
};
export const formatAurData = function(aurData:any){
  let tempData:any = [];
  aurData.forEach((i:any)=>{
    let tempItem:any = {
      arch: 'any',
      repo: 'aur',
      pkgdesc: i.Description,
      url: i.URL,
      archURL: `https://aur.archlinux.org/packages/${i.Name}`,
      licenses: 'N/A',
      maintainers: i.Maintainer,
      compressed_size: 'N/A',
      installed_size: 'N/A',
      last_update: new Date(i.LastModified * 1000).toLocaleDateString(),
      packager: [i.Maintainer],
      pkgname: i.Name,
      votes: i.NumVotes,
      pkgver: i.Version
    };
    if (i.OutOfDate) {
      tempItem.flag_date = new Date(i.OutOfDate * 1000).toLocaleDateString();
    }
    tempData.push(tempItem);
  });
  return tempData;
}

export const getAurResults = async function(packageName:any,res:any){
  let aurResults=[];
  try{
    let response:any = await fetch(`https://aur.archlinux.org/rpc?v=5&type=search&arg=${packageName}`,{
      method: "GET",
    });
    if (response.ok && response.headers.get('content-type').includes('application/json')){
      aurResults = (await response.json()).results;
    }
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the arch api`);
    res.status(500).json({error: `Error when fetching search results for package ${packageName} in the arch api`})
  }
  return aurResults;
}

export const formatDate = function(date:any){
  //if the date is empty return an empty string
  if (!date) return '';
  //create a new date with the date input
  let formattedDate = new Date(date)
  //format the date to "month day,year"
  .toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC', hour12: false})+' UTC';
  return formattedDate;
};
export const formatPackageSize = function(sizeBytes:any) {
  let sizeKB = sizeBytes / 1024; // Convert bytes to KB
  let sizeMB = sizeKB / 1024; // Convert KB to MB
  let sizeGB = sizeMB / 1024; // Convert MB to GB
  if (sizeBytes < 1024) {
    return `${sizeBytes} Bytes`;
  } else if (sizeKB < 1024) {
    return `${sizeKB.toFixed(2)} KB`;
  } else if (sizeMB < 1024) {
    return `${sizeMB.toFixed(2)} MB`;
  } else {
    return `${sizeGB.toFixed(2)} GB`;
  }
};

export const organizeData = function(dataArr:any){
  dataArr.forEach((i:any)=>{
    i.last_update=formatDate(i.last_update);
    i.build_date=formatDate(i.build_date);
    i.flag_date=formatDate(i.flag_date);
    if (Array.isArray(i.maintainers)){
      i.maintainers = i.maintainers.join(', ');
    }
    if (Array.isArray(i.licenses)){
      i.licenses.join(', ');
    }
    if (i.repo==='aur'){
      i.archUrl = `https://aur.archlinux.org/packages/${i.pkgname}`;
    }else{
      i.archUrl = `https://archlinux.org/packages/${i.repo}/${i.arch}/${i.pkgname}`;
    }
    i.compressed_size = formatPackageSize(i.compressed_size);
    i.installed_size = formatPackageSize(i.installed_size);
  })
  return dataArr;
}