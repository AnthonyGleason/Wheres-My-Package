import { USE_LOCALHOST } from "../Configs/clientSettings";
import { Package } from "../Interfaces/interfaces";

export class SearchQuery{
  results:Package[];
  term: string;
  exactMatch: Package | undefined;
  archInput:string;
  repoInput:string;
  searchInput:string;
  constructor(){
    this.results = [];
    this.term = '';
    this.archInput='any';
    this.repoInput='any';
    this.searchInput='';
  }

  //sets the search term to a lucky term, (a random valid term is selected from a curated list of terms and then a search is performed)
  setLuckyTerm = async():Promise<Package[]>=>{
    const luckyTerms:string[]=['python','rust','linux','pipewire','i3-wm','pulseaudio','xorg-server','node','git',];
    //get random index of luckyTerms arr
    const index:number = Math.floor(Math.random() * luckyTerms.length)
    const lucky:string = luckyTerms[index];
    //update the search term
    this.term=lucky;
    //get results for the search
    return await this.getResults();
  };

  getResults = async():Promise<Package[]>=>{
    try{
      //form validation
      if (!this.term || this.term==='') throw new Error('The package search input cannot be left blank.');
      //get data from sever
      let response = await fetch(this.getServerUrl(),{
        method : 'GET',
      });
      const responseData = await response.json();
      const searchResults = responseData.allResults;
      this.exactMatch = responseData.exactMatch;
      if (searchResults.length===0){
        throw new Error('No results found.');
      }
      this.results=searchResults;
      return searchResults;
    }catch(e){
      console.log(`${e} when getting package data`);
      return [];
    }
  };
  
  getServerUrl = ():string=>{
      if (USE_LOCALHOST){
        return `http://localhost:5000/api/search/${this.term}`
      }else{
        return `https://wheresmypackage.herokuapp.com/api/search/${this.term}`
      }
  };

  //returns the first result found for a package
  findResult = (pkgname:string):Package | undefined=>{
    const results:Package[] = this.results.filter((result:Package)=>{
      return result.pkgname===pkgname;
    });
    if (results){
      return results[0];
    };
  };

  //returns the length of the results array
  getResultsLength = ():number=>{
    if (this.results){
      return this.results.length;
    }else{
      return 0;
    }
  };

  filterResults = ():Package[]=>{
    // add the snippet property to this class
    let tempResults:Package[] = this.results;
    //filter array by architecture
    tempResults = tempResults.filter((result:any)=>{
      //if the any field is selected then return every item
      if (this.archInput.toLowerCase()==='any') return true;
      //otherwise compare the result's architecture to the user selected architecture filter
      return result.arch===this.archInput;
    });
    //filter array by repository
    tempResults = tempResults.filter((result:any)=>{
      //if the any field is selected then return every item
      if (this.repoInput.toLowerCase()==='any') return true;
      //otherwise compare the result's repository to the user selected repository filter
      return result.repo===this.repoInput.toLowerCase();
    });
    if (this.exactMatch){
      const pkgname = this.exactMatch.pkgname;
      //remove the exact match from the searchResults arr
      tempResults = tempResults.filter((result:any)=>{
        return result.pkgname!==pkgname;
      })
      //set the exact match as the first result
      tempResults.unshift(this.exactMatch);
    };
    this.results=tempResults;
    return tempResults;
  };
};