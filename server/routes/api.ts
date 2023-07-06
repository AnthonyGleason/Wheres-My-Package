import express, { Router } from 'express';
import { Request, Response,NextFunction } from 'express';
import { SearchQuery } from '../classes/SearchQuery';
import { Package } from '../interfaces/interfaces';
export const apiRouter:Router = express.Router();

// greeting message
apiRouter.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({'message': `You have successfully connected to the Where's My Package API`});
});

// search for a package
apiRouter.get('/search/:searchQuery', async(req:Request,res:Response,next:NextFunction)=>{
  const Search:SearchQuery = new SearchQuery(req.params.searchQuery);
  //get all results then prettifies them
  await Search.getAllResults().then(()=>{
    Search.prettifyResults();
  });
  const exactMatch:Package | undefined = Search.findExactMatch(Search.allResults);
  //return package results
  res.status(200).json({
    'allResults': Search.allResults,
    'exactMatch': exactMatch,
  });
})