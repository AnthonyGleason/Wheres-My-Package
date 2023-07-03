import { Package } from "../interfaces/interfaces";
import { Response } from "express";

//fetch search results for the search input on the main arch repositories
export const getArchResults = async function(packageName:string,res:Response):Promise<Package[]>{
  //initialize arch results with an empty array
  let archResults:Package[] = [];
  try{
    //make a request to the arch linux api looking for the search input
    let response:any = await fetch(`https://archlinux.org/packages/search/json/?q=${packageName}`,{
      method: "GET",
    });
    if (response.ok && response.headers.get('content-type').includes('application/json')){
      const archData = await response.json();
      archResults = archData.results;
    }
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the arch api`);
    res.status(500).json({'message': `Error when fetching search results for package ${packageName} in the arch api`})
  }
  return archResults;
};