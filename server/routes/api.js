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
  //organize data
  archResults.forEach((i)=>{
    i.last_update=formatDate(i.last_update);
    i.build_date=formatDate(i.build_date);
    i.flag_date=formatDate(i.flag_date);
    i.maintainers.join(', ');
    i.licenses.join(', ');
    i.archUrl = `https://archlinux.org/packages/${i.repo}/${i.arch}/${i.pkgname}`;
    i.compressed_size = formatPackageSize(i.compressed_size);
    i.installed_size = formatPackageSize(i.installed_size);
  })
  
  //check results for exact match
  exactMatch = findExactMatch(archResults,packageName);
  //return package results
  res.status(200).json({
    allResults: archResults,
    exactMatch: exactMatch,
  });
})

module.exports = router;

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
