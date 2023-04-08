var express = require('express');
var router = express.Router();
const {getPackageQuery} = require('../linux/getPackageQuery');

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

  let debianResults;
  let archResults;
  //get debian package query results
  try{
    let response = await fetch(packageQuerys[0].url,{
      method: "GET",
    });
    debianResults = await response.json();
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the debian api`);
    res.status(500).json({error: `Error when fetching search results for package ${packageName} in the debian api`})
  }
  //get arch query results
  try{
    let response = await fetch(packageQuerys[1].url,{
      method: "GET",
    });
    archResults = await response.json();
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the arch api`);
    res.status(500).json({error: `Error when fetching search results for package ${packageName} in the arch api`})
  }
  //organize results
  //return package results
  res.status(200).json({
    debian: debianResults,
    arch: archResults
  });
})
module.exports = router;