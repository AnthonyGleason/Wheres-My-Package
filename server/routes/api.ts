import express from 'express';
import { findExactMatch,getArchResults,getAurResults,organizeData, formatAurData} from '../lib/dataHandling';
import { Request, Response,NextFunction } from 'express';
import { Package } from '../interfaces/interfaces';
export const apiRouter = express.Router();

// greeting message
apiRouter.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({'message': `You have successfully connected to the Where's My Package API`});
});

// search for a package
apiRouter.get('/search/:packageName', async(req:Request,res:Response,next:NextFunction)=>{
  //get the package name from the route
  const packageName:string = req.params.packageName;
  //get arch query results
  const archResults:Package[] = await getArchResults(packageName,res);
  ////REFACTORING UP TO HERE////


  //get aur query results
  let aurResults = await getAurResults(packageName,res);
  //format aur data into a temp array
  aurResults= formatAurData(aurResults);
  //join both arrays
  let allResults = archResults.concat(aurResults);
  //organize data
  allResults=organizeData(allResults);
  //check results for exact match
  let exactMatch:any = null;
  exactMatch = findExactMatch(allResults,packageName);
  //return package results
  res.status(200).json({
    'allResults': allResults,
    'exactMatch': exactMatch,
  });
})