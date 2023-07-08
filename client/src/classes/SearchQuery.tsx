import { USE_LOCALHOST } from "../clientSettings";
import { Package } from "../interfaces/interfaces";

export class SearchQuery{
  results:Package[];
  term: string;
  exactMatch: Package | undefined;
  
  constructor(){
    this.results = [];
    this.term = '';
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
};