var express = require('express');
var router = express.Router();
const {findExactMatch,getArchResults} = require('../scripts/dataHandling');

// /api
router.get('/', (req, res, next) => {
  res.status(200).json({message: 'Connected to the api successfully'});
});

// /api/search/:packageName
router.get('/search/:packageName', async(req,res,next)=>{
  let exactMatch = null;
  //get the package name from the route
  const packageName = req.params.packageName;
  //get arch query results
  let archResults = await getArchResults(packageName,res);
  //check results for exact match
  exactMatch = findExactMatch(archResults,packageName);
  //return package results
  res.status(200).json({
    results: archResults,
    exactMatch: exactMatch,
  });
})

module.exports = router;