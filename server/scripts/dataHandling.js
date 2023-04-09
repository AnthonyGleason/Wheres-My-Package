let findExactMatch = function(archResults,packageName){
  let exactMatch = null;
  archResults.forEach((match)=>{
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

module.exports = {findExactMatch,getArchResults};