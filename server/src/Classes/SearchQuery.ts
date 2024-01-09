import { Package } from "../Interfaces/interfaces";
import { ArchQuery } from "./arch/ArchQuery";
import { AurQuery } from "./arch/AurQuery";

export class SearchQuery{
  term:string;
  aurQuery:AurQuery;
  archQuery:ArchQuery;
  allResults:Package[];

  constructor(term:string){
    this.term = term;
    this.archQuery = new ArchQuery(term);
    this.aurQuery = new AurQuery(term);
    this.allResults = [];
  };

  //gets all of the results
  getAllResults = async ():Promise<void>=>{
    await Promise.all([
      this.archQuery.getResults(),
      this.aurQuery.getResults(),
    ]).then(()=>{
     this.allResults = this.archQuery.results.concat(this.aurQuery.results);
    });
  };

  //formats the provided date into a human readable date for the client
  formatDate = (date:string):string=>{
    //if a date does not exist return an empty string, prevents Invalid Date UTC errors
    if (!date) return '';
    //create a date with the date input
    return new Date(date).toLocaleDateString('en-US',{
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC',
      hour12: false
    })+' UTC';
  };

  //formats package size into a string which can be displayed on the client
  formatPackageSize = (sizeBytes:string | number):string=> {
    //if the sizeBytes was provided as a string convert it to a number
    if (typeof(sizeBytes)==='string')sizeBytes=parseInt(sizeBytes);
    const sizeKB:number = sizeBytes / 1024; // Convert bytes to KB
    const sizeMB:number = sizeKB / 1024; // Convert KB to MB
    const sizeGB:number = sizeMB / 1024; // Convert MB to GB
    //this conditional will pick the optimal size displayed depending on the package size
    if (sizeBytes < 1024) {
      return `${sizeBytes} Bytes`;
    } else if (sizeKB < 1024) {
      return `${sizeKB.toFixed(2)} KB`;
    } else if (sizeMB < 1024) {
      return `${sizeMB.toFixed(2)} MB`;
    } else {
      return `${sizeGB.toFixed(2)} GB`;
    };
  };

  //finds the exact match for the search term (if it exists)
  findExactMatch = (resultsArr:Package[]):Package | undefined=>{
    //result is equal to the last element of the array. I am not using pop() here because i do not want to modify the original array
    const result:Package | undefined = resultsArr[resultsArr.length-1];
    // base case, if the result is undefined return that result. we can assume an exact match does not exist
    if (typeof(result)==='undefined') return result;
    // base case, an exact match is found. return the result
    if (result.pkgname.toLowerCase()===this.term.toLowerCase()){
      return result;
    }else{
      return this.findExactMatch(resultsArr.slice(0,resultsArr.length-1));
    }
  };

  //prettifies the results organizing data for the client ensuring it is user friendly and human readable
  prettifyResults = ():void=>{
    //make a copy of the results array
    let updatedResults:Package[] = this.allResults;
    //iterate through the results array
    this.allResults.forEach((result:Package,resultIndex:number)=>{
      //copy the result into a temporary array
      let updatedResult:Package = result;
      //format the dates
      updatedResult.last_update=this.formatDate(result.last_update);
      updatedResult.build_date=this.formatDate(result.build_date);
      updatedResult.flag_date=this.formatDate(result.flag_date);
      //join the array of maintainers if applicable
      if (Array.isArray(result.maintainers)){
        updatedResult.maintainers = result.maintainers.join(', ');
      }
      //join the array of licenses if applicable
      if (Array.isArray(result.licenses)){
        updatedResult.licenses = result.licenses.join(', ');
      }
      //get url for the package
      if (result.repo==='aur'){
        updatedResult.archUrl = `https://aur.archlinux.org/packages/${result.pkgname}`;
      }else{
        updatedResult.archUrl = `https://archlinux.org/packages/${result.repo}/${result.arch}/${result.pkgname}`;
      }
      //format compressed and install sizes
      updatedResult.compressed_size = this.formatPackageSize(result.compressed_size);
      updatedResult.installed_size = this.formatPackageSize(result.installed_size);
      //update the result in the updated results array
      updatedResults[resultIndex] = updatedResult;
    })
    this.allResults=updatedResults;
  }
}