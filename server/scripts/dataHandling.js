let findExactMatch = function(allResults,packageName){
  let exactMatch = {
    pkgname: '',
  };
  allResults.forEach((match)=>{
    if (match.pkgname===packageName.toLowerCase()){
      exactMatch=match;
    }
  })
  return exactMatch;
};

let getArchResults = async function(packageName,res){
  let archResults=[];
  try{
    let response = await fetch(`https://archlinux.org/packages/search/json/?q=${packageName}`,{
      method: "GET",
    });
    if (response.ok && response.headers.get('content-type').includes('application/json')){
      archResults = (await response.json()).results;
    }
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the arch api`);
    res.status(500).json({error: `Error when fetching search results for package ${packageName} in the arch api`})
  }
  return archResults;
};

let getAurResults = async function(packageName,res){
  let aurResults=[];
  try{
    let response = await fetch(`https://aur.archlinux.org/rpc?v=5&type=search&arg=${packageName}`,{
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

let formatDate = function(date){
  //if the date is empty return an empty string
  if (!date) return '';
  //create a new date with the date input
  let formattedDate = new Date(date)
  //format the date to "month day,year"
  .toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC', hour12: false})+' UTC';
  return formattedDate;
};
let formatPackageSize = function(sizeBytes) {
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

let organizeData = function(dataArr){
  dataArr.forEach((i)=>{
    i.last_update=formatDate(i.last_update);
    i.build_date=formatDate(i.build_date);
    i.flag_date=formatDate(i.flag_date);
    if (Array.isArray(i.maintainers)){
      i.maintainers = i.maintainers.join(', ');
    }
    if (Array.isArray(i.licenses)){
      i.licenses.join(', ');
    }
    i.archUrl = `https://archlinux.org/packages/${i.repo}/${i.arch}/${i.pkgname}`;
    i.compressed_size = formatPackageSize(i.compressed_size);
    i.installed_size = formatPackageSize(i.installed_size);
  })
  return dataArr;
}
module.exports = {findExactMatch,getArchResults,formatDate,formatPackageSize,getAurResults,organizeData};