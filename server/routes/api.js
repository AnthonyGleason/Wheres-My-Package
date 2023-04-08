var express = require('express');
const {getPackageQuery} = require('../linux/getPackageQuery');
var router = express.Router();
//config results
const resultsLimit = 30;

// /api
router.get('/', (req, res, next) => {
  res.status(200).json({message: 'Connected to the api successfully'});
});

// /api/search/:packageName
router.get('/search/:packageName', async(req,res,next)=>{
  //get the package name from the route
  const packageName = req.params.packageName;
  //packageQuerys is an array of objects, each array item contains the distro name and url to search for the package
  const packageQuerys = getPackageQuery(packageName);
  /* 
    I created individual variables for each rather than using an array because the each api could be called
    from and return results in different ways.
  */
  let debianResults=[];
  let archResults=[];
  let ubuntuResults=[];
  //get debian package query results
  try{
    let response = await fetch(packageQuerys[0].url,{
      method: "GET",
    });
    if (response.ok && response.headers.get('content-type').includes('application/json')){
      debianResults = (await response.json()).results;
    }
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the debian api`);
    res.status(500).json({error: `Error when fetching search results for package ${packageName} in the debian api`})
  }
  //get arch query results
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
  //get ubuntu query results
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
  //limit results
  debianResults.other = debianResults.other.splice(0,resultsLimit);
  archResults = archResults.splice(0,resultsLimit-1);
  //ubuntu only shows the exact match for packages
  //return package results
  res.status(200).json({
    packageResults: [
      debianResults,
      archResults,
      ubuntuResults
    ]
  });
})

module.exports = router;