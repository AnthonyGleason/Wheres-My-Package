var express = require('express');
var router = express.Router();

//config results
// const resultsLimit = 30;

// /api
router.get('/', (req, res, next) => {
  res.status(200).json({message: 'Connected to the api successfully'});
});

// /api/search/:packageName
router.get('/search/:packageName', async(req,res,next)=>{
  //get the package name from the route
  const packageName = req.params.packageName;
  //get arch query results
  let archResults = await getArchResults(packageName,res);
  //limit results
  // archResults = archResults.splice(0,resultsLimit);
  //return package results
  res.status(200).json({
    results: archResults,
  });
})

module.exports = router;

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