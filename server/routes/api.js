var express = require('express');
var router = express.Router();
const {findExactMatch,getArchResults,formatDate,formatPackageSize} = require('../scripts/dataHandling');

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

