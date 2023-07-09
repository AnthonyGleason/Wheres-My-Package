import { SearchQuery } from "./SearchQuery";
import { Package } from "../interfaces/interfaces";
import { resultsPerPage } from "../clientSettings";

export class PackageBrowser{
  currentPage:number;
  isLoading:boolean;
  searchQuery:SearchQuery;
  totalPages:number;
  resultsSnip: Package[];

  constructor(){
    this.currentPage=0;
    this.isLoading=false;
    this.totalPages = 0;
    this.resultsSnip = [];
    this.searchQuery = new SearchQuery();
  };
  
  //handles page changes by looking at a modifier which adds or subtracts from the this.currentPage
  handlePageChange = (modifier:number):void=>{
    const currentPage:number = this.currentPage;
    //returns the next page based on the modifier provided
    const getNextPage = function():number{
      if (modifier===-1){
        return currentPage-1;
      }else if (modifier===1){
        return currentPage+1;
      }else{
        return 1;
      }
    };
    //get the next page
    const nextPage:number = getNextPage();
    //only update next page if the page is within valid range and a valid number
    if (nextPage && nextPage<=this.totalPages){
      //update the currentPage
      this.currentPage=nextPage;
    };
  };
  
  //returns and sets a results snip based on the current page the user is browsing and the number of results per page the client is set to
  getResultsSnip = ():Package[]=>{
    //set the total number of pages rounding the page up so the last page of search results is not cut off
    this.totalPages = Math.ceil(this.searchQuery.results.length/resultsPerPage);
    if (this.totalPages>0){
      this.resultsSnip = this.searchQuery.results.slice((this.currentPage - 1) * resultsPerPage, this.currentPage * resultsPerPage);
    }else{
      this.resultsSnip = [];
    };
    return this.resultsSnip;
  };
  
  //returns the class for the provided result, the results-alt-item class gives an alternate background color to every other search result to reduce eye strain.
  getResultClass = (result:Package):string=>{
    //alternate background colors by adding results-alt-item class to every other item
    if (this.resultsSnip.indexOf(result)%2===1){
      return 'result results-alt-item';
    }else{
      return 'result';
    }
  };

  //if the search is loading show the spinning loading image
  getLoadingImgStyle = ()=>{
    if (this.isLoading){
      return 'block';
    }else{
      return 'none';
    }
  };

  //gets the current button text color for the search and lucky buttons
  getButtonTextColor = ():string=>{
    //if the loading display is block we can assume the loading img is being shown to the user
    if (this.isLoading){
      return 'grey'; //the loading image is currently being shown to the user
    }else{
      return 'black'; //the loading image is not currently being shown to the user (set buttons to regular styling color)
    }
  };
  //disable search buttons from the user preventing searches from being performed
  lockSearch = ()=>{
    //lock buttons
    const searchButton:any = document.querySelector('.search-button');
    const luckyButton:any = document.querySelector('.lucky-button');
    searchButton.disabled = true;
    luckyButton.disabled = true;
    this.isLoading=true;
  }
  //unlock search buttons so the user can use them
  unlockSearch =()=>{
    //lock buttons
    const searchButton:any = document.querySelector('.search-button');
    const luckyButton:any = document.querySelector('.lucky-button');
    searchButton.disabled = false;
    luckyButton.disabled = false;
    this.isLoading=false;
  }
  //sets the input based on provided input type
  setInput = (type:string,input:string):void=>{
    switch (type){
      case 'arch':
        this.searchQuery.archInput = input;
        break;
      case 'repo':
        this.searchQuery.repoInput = input;
        break;
      case 'search':
        this.searchQuery.searchInput = input;
        break;
      default:
        break;
    };
  };
};