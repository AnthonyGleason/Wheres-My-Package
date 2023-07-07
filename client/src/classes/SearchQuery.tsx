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

  //perform a lucky search, (a random valid term is selected from a curated list of terms and then a search is performed)
  getLuckyResults = async():Promise<void>=>{
    const luckyTerms:string[]=['python','rust','linux','pipewire','i3-wm','pulseaudio','xorg-server','node','git',];
    //get random index of luckyTerms arr
    const index:number = Math.floor(Math.random() * luckyTerms.length)
    const lucky:string = luckyTerms[index];
    //update the search term
    this.term=lucky;
    //get results for the search
    this.getResults();
  };

  getResults = async():Promise<void>=>{
    try{
      //form validation
      if (!this.term || this.term==='') throw new Error('The package search input cannot be left blank.');
      //get data from sever
      let response = await fetch(this.getServerUrl(),{
        method : 'GET',
      });
      const responseData = await response.json();
      const searchResults = responseData.allResults;
      if (searchResults.length===0){
        throw new Error('No results found.');
      }
      this.results=searchResults;
    }catch(e){
      console.log(`${e} when getting package data`);
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