import { Package } from "../interfaces/interfaces";
import { Response } from "express";

export const getAurResults = async function(packageName:string,res:Response):Promise<Package[]>{
  let aurResults=[];
  try{
    let response:any = await fetch(`https://aur.archlinux.org/rpc?v=5&type=search&arg=${packageName}`,{
      method: "GET",
    });
    if (response.ok && response.headers.get('content-type').includes('application/json')){
      aurResults = (await response.json()).results;
    }
  }catch(e){
    console.log(`Error ${e} when fetching search results for package ${packageName} in the arch api`);
    res.status(500).json({error: `Error when fetching search results for package ${packageName} in the arch api`})
  }
  return aurResults;
}