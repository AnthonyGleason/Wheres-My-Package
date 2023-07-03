import express, { Router } from 'express';
import { findExactMatch,organizeResultData, formatAurData} from '../lib/handleData';
import { getArchResults } from '../controllers/archResults';
import { getAurResults } from '../controllers/aurResults';
import { Request, Response,NextFunction } from 'express';
import { Package } from '../interfaces/interfaces';
export const apiRouter:Router = express.Router();

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
  //get aur query results
  const aurResults:Package[] = await getAurResults(packageName,res);
  //join the arch results array and formatted AUR data 
  let allResults:Package[] = archResults.concat(formatAurData(aurResults));
  //organize data in all results
  allResults=organizeResultData(allResults);
  //check results for exact match
  const exactMatch:Package | undefined = findExactMatch(allResults,packageName);
  //return package results
  res.status(200).json({
    'allResults': allResults,
    'exactMatch': exactMatch,
  });
})