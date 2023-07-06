export class AurQuery{
  term:string;
  results:any[];

  constructor(term:string){
    this.term=term;
    this.results=[];
  };

  //gets the results for the search term on the aur
  getResults = async():Promise<any[]>=>{
    let aurResults=[];
    try{
      let response:any = await fetch(`https://aur.archlinux.org/rpc?v=5&type=search&arg=${this.term}`,{
        method: "GET",
      });
      if (response.ok && response.headers.get('content-type').includes('application/json')){
        aurResults = (await response.json()).results;
      }
    }catch(e){
      console.log(`Error ${e} when fetching search results for package ${this.term} in the arch api`);
    }
    this.results=aurResults;
    this.formatAurData();
    return aurResults;
  };

  //formats aur data in the form of a main arch repository package
  formatAurData = ():void=>{
    let tempAurData:any = [];
    this.results.forEach((result:any)=>{
      let tempItem:any = {
        arch: 'any',
        repo: 'aur',
        pkgdesc: result.Description,
        url: result.URL,
        archURL: `https://aur.archlinux.org/packages/${result.Name}`,
        licenses: 'N/A',
        maintainers: result.Maintainer,
        compressed_size: 'N/A',
        installed_size: 'N/A',
        last_update: new Date(result.LastModified * 1000).toLocaleDateString(),
        packager: [result.Maintainer],
        pkgname: result.Name,
        votes: result.NumVotes,
        pkgver: result.Version
      };
      //The out of date flag only appears on packages that are out of date otherwise it is ommitted.
      //This check will create a flag_date property with the date the package was flagged if applicable.
      if (result.OutOfDate) {
        tempItem.flag_date = new Date(result.OutOfDate * 1000).toLocaleDateString();
      };
      tempAurData.push(tempItem);
    });
    this.results=tempAurData;
  };
}