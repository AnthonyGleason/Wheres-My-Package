import { Package } from "../../interfaces/interfaces";

export class ArchQuery{
  term: string;
  results:any[];

  constructor(term:string){
    this.term = term;
    this.results = [];
  };

  getResults = async ():Promise<any[]>=>{
    //initialize arch results with an empty array
    let archResults:Package[] = [];
    try{
      //make a request to the arch linux api looking for the search input
      let response:any = await fetch(`https://archlinux.org/packages/search/json/?q=${this.term}`,{
        method: "GET",
      });
      if (response.ok && response.headers.get('content-type').includes('application/json')){
        const archData = await response.json();
        archResults = archData.results;
      }
    }catch(e){
      console.log(`Error ${e} when fetching search results for package ${this.term} in the arch api`);
    }
    this.results = archResults;
    return archResults;
  };
}