let getDebianResults = async function(packageName,packageQuerys,res){
  let debianResults=[];
  try{
    let response = await fetch(packageQuerys[0].url,{
      method: "GET",
    });
    if (response.ok && response.headers.get('content-type').includes('application/json')){
      debianResults = (await response.json()).results;
      if (debianResults.exact) debianResults.other.unshift(debianResults.exact);
      return debianResults.other;
    }
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the debian api`);
    res.status(500).json({error: `Error when fetching search results for package ${packageName} in the debian api`})
  }
};
let getArchResults = async function(packageName,packageQuerys,res){
  let archResults=[];
  try{
    let response = await fetch(packageQuerys[1].url,{
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
let getUbuntuResults = async function(packageName,packageQuerys,res){
  let ubuntuResults=[];
  try{
    let response = await fetch(packageQuerys[2].url,{
      method: "GET",
    });
    //if a match isn't found on ubuntu the server responds with an error so we have to check if it is in json format
    if (response.ok && response.headers.get('content-type').includes('application/json')){
      ubuntuResults = (await response.json());
    }
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the ubuntu api`);
    res.status(500).json({error: `Error when fetching search results for package ${packageName} in the ubuntu api`})
  }
  return ubuntuResults;
};

module.exports={getDebianResults,getArchResults,getUbuntuResults};