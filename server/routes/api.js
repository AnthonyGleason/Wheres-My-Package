var express = require('express');
var router = express.Router();
const {findExactMatch,getArchResults,formatDate,formatPackageSize,getAurResults,organizeData} = require('../scripts/dataHandling');

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
  //get aur query results
  let aurResults = await getAurResults(packageName,res);
  //format aur data into a temp array
  aurResults = formatAurData(aurResults);
  //join both arrays
  let allResults = archResults.concat(aurResults);
  //organize data
  allResults=organizeData(allResults);
  //check results for exact match
  exactMatch = findExactMatch(allResults,packageName);
  //return package results
  res.status(200).json({
    allResults: allResults,
    exactMatch: exactMatch,
  });
})

module.exports = router;

let formatAurData = function(aurData){
  let tempData = [];
  aurData.forEach((i)=>{
    let tempItem = {
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