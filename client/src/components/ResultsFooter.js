import React from 'react';
import {v4 as uuidGen} from 'uuid';

export default function ResultsFooter({currentPage, setCurrentPage,totalPages}){
  return(
    <div className="results-footer">
      {
        renderPages(currentPage,setCurrentPage,totalPages)
      }
    </div>
  )
}
/*
  renders current page navigation
  will render a max of 9 page selections for the user.
  selected number will be centered if there is room for more page numbers above and below it
*/
let renderPages = function(currentPage,setCurrentPage,totalPages){
  //validate current page
  if (currentPage<1 || currentPage>totalPages) currentPage=1;
  let pageArr = [];
  //There is space 4 spaces below and 4 spaces above the current page. This centers the current page at a number higher than 1.
  if (currentPage-4>1 && currentPage+4<totalPages && currentPage.length>9){
    pageArr= [
      currentPage-4,currentPage-3,currentPage-2,currentPage-1,
                        currentPage,
      currentPage+1,currentPage+2,currentPage+3,currentPage+4
    ];
  }else if(currentPage-4<1 && totalPages>9){ 
    //There is no space to fit 4 numbers to the left of the currentPage. The totalpages is >9 which means we can just print pages 1-9 to the user.
    let counter=1;
    while (counter<9 && counter<=totalPages){
      pageArr.push(counter);
      counter++;
    }
  }else if(currentPage+4>totalPages && totalPages>9){
    //There is no space to fit 4 numbers above the current page. the totalpages is greater than 9. we can assume that we are at the end of the pages so we can count backwards to generate the page numbers.
    let counter=1;
    while (counter<9 || counter>totalPages){
      pageArr.unshift(totalPages-counter);
      counter++;
    }
  }else{
    let counter=1;
    //otherwise just print the pages
    while (counter<totalPages){
      pageArr.push(counter);
      counter++;
    }
  }
  return(
    <ul>
      {
        pageArr.map((i)=>{
          return(<li onClick={()=>setCurrentPage(i)} key={uuidGen()}>{i}</li>);
        })
      }
    </ul>
  )
}