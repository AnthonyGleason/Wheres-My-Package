var express = require('express');
const {getPackageQuery} = require('../linux/getPackageQuery');
const { getDebianResults, getArchResults, getUbuntuResults } = require('../linux/getQueryResults');
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
  //get debian package query results
  let debianResults = await getDebianResults(packageName,packageQuerys,res);
  //get arch query results
  let archResults = await getArchResults(packageName,packageQuerys,res);
  //get ubuntu query results
  let ubuntuResults = await getUbuntuResults(packageName,packageQuerys,res);
  //limit results
  debianResults = debianResults.splice(0,resultsLimit);
  archResults = archResults.splice(0,resultsLimit-1);
  //ubuntu only shows the exact match for packages
  //return package results
  res.status(200).json({
    debian: debianResults,
    arch: archResults,
    ubuntu: ubuntuResults
  });
})

module.exports = router;