import express from 'express';
import { findExactMatch,getArchResults,getAurResults,organizeData, formatAurData} from '../lib/dataHandling';
export const apiRouter = express.Router();

// greeting message
apiRouter.get('/', (req, res, next) => {
  res.status(200).json({message: 'Connected to the api successfully'});
});

// search for a package
apiRouter.get('/search/:packageName', async(req,res,next)=>{
  let exactMatch:any = null;
  //get the package name from the route
  const packageName = req.params.packageName;
  //get arch query results
  let archResults = await getArchResults(packageName,res);
  //get aur query results
  let aurResults = await getAurResults(packageName,res);
  //format aur data into a temp array
  aurResults= formatAurData(aurResults);
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