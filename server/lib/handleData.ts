import { Package } from "../interfaces/interfaces";

//formats aur data into a arch main repository style package
export const formatAurData = function(aurData:any):Package[]{
  let tempAurData:any = [];
  aurData.forEach((result:any)=>{
    let tempItem:any = {
      arch: 'any',
      repo: 'aur',
      pkgdesc: result.Description,
      url: result.URL,
      archURL: `https://aur.archlinux.org/packages/${result.Name}`,
      licenses: 'N/A',
      maintainers: result.Maintainer,
      compressed_size: 'N/A',
      installed_size: 'N/A',
      last_update: new Date(result.LastModified * 1000).toLocaleDateString(),
      packager: [result.Maintainer],
      pkgname: result.Name,
      votes: result.NumVotes,
      pkgver: result.Version
    };
    //The out of date flag only appears on packages that are out of date otherwise it is ommitted.
    //This check will create a flag_date property with the date the package was flagged if applicable.
    if (result.OutOfDate) {
      tempItem.flag_date = new Date(result.OutOfDate * 1000).toLocaleDateString();
    };
    tempAurData.push(tempItem);
  });
  return tempAurData;
}

//formats the provided date into a human readable date for the client
export const formatDate = function(date:string):string{
  //if a date does not exist return an empty string, prevents Invalid Date UTC errors
  if (!date) return '';
  //create a date with the date input
  return new Date(date).toLocaleDateString('en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
    hour12: false
  })+' UTC';
};

//formats package size into a string which can be displayed on the client
export const formatPackageSize = function(sizeBytes:string | number):string {
  //if the sizeBytes was provided as a string convert it to a number
  if (typeof(sizeBytes)==='string')sizeBytes=parseInt(sizeBytes);
  const sizeKB:number = sizeBytes / 1024; // Convert bytes to KB
  const sizeMB:number = sizeKB / 1024; // Convert KB to MB
  const sizeGB:number = sizeMB / 1024; // Convert MB to GB
  //this conditional will pick the optimal size displayed depending on the package size
  if (sizeBytes < 1024) {
    return `${sizeBytes} Bytes`;
  } else if (sizeKB < 1024) {
    return `${sizeKB.toFixed(2)} KB`;
  } else if (sizeMB < 1024) {
    return `${sizeMB.toFixed(2)} MB`;
  } else {
    return `${sizeGB.toFixed(2)} GB`;
  };
};

//prettifies the results organizing data for the client ensuring it is user friendly and human readable
export const prettifyResults = function(results:Package[]):Package[]{
  //make a copy of the results array
  let updatedResults:Package[] = results;
  //iterate through the results array
  results.forEach((result:Package,resultIndex:number)=>{
    //copy the result into a temporary array
    let updatedResult:Package = result;
    //format the dates
    updatedResult.last_update=formatDate(result.last_update);
    updatedResult.build_date=formatDate(result.build_date);
    updatedResult.flag_date=formatDate(result.flag_date);
    //join the array of maintainers if applicable
    if (Array.isArray(result.maintainers)){
      updatedResult.maintainers = result.maintainers.join(', ');
    }
    //join the array of licenses if applicable
    if (Array.isArray(result.licenses)){
      updatedResult.licenses = result.licenses.join(', ');
    }
    //get url for the package
    if (result.repo==='aur'){
      updatedResult.archUrl = `https://aur.archlinux.org/packages/${result.pkgname}`;
    }else{
      updatedResult.archUrl = `https://archlinux.org/packages/${result.repo}/${result.arch}/${result.pkgname}`;
    }
    //format compressed and install sizes
    updatedResult.compressed_size = formatPackageSize(result.compressed_size);
    updatedResult.installed_size = formatPackageSize(result.installed_size);
    //update the result in the updated results array
    updatedResults[resultIndex] = updatedResult;
  })
  //return the prettified results
  return updatedResults;
}

//returns the first match found in the provided resultsArr recursively
export const findExactMatch = function(resultsArr:Package[],pkgname:string):Package | undefined{
  //result is equal to the last element of the array. I am not using pop() here because i do not want to modify the original array
  const result:Package | undefined = resultsArr[resultsArr.length-1];
  // base case, if the result is undefined return that result. we can assume an exact match does not exist
  if (typeof(result)==='undefined') return result;
  // base case, an exact match is found. return the result
  if (result.pkgname.toLowerCase()===pkgname.toLowerCase()){
    return result;
  }else{
    return findExactMatch(resultsArr.slice(0,resultsArr.length-1),pkgname);
  }
};