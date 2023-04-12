import React from 'react';
import {v4 as uuidGen} from 'uuid';

export default function ResultsFooter({currentPage, setCurrentPage,totalPages}){
  return(
    <div className="results-footer">
      <button onClick={()=>{handlePageButton(currentPage,setCurrentPage,-1,totalPages)}}>Prev</button>
      {
        renderPages(currentPage,setCurrentPage,totalPages)
      }
      <button onClick={()=>{handlePageButton(currentPage,setCurrentPage,1,totalPages)}}>Next</button>
    </div>
  )
}
let handlePageButton = function(currentPage, setCurrentPage, modifier, totalPages) {
  let newPage = currentPage;
  if (modifier === 1) newPage = currentPage + modifier;
  if (modifier === -1) newPage = currentPage + modifier;
  if (newPage < 1) newPage = totalPages;
  if (newPage > totalPages) newPage = 1;
  setCurrentPage(newPage);
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
  let start = currentPage - 4;
  let end = currentPage + 4;
  //add numbers to the end from the start
  if (start < 1) {
    end += Math.abs(start) + 1;
    start = 1;
  }
  //add numbers to the start from the end
  if (end > totalPages) {
    start -= end - totalPages-1;
    end = totalPages;
  }
  //make sure start and end are within the valid range
  if (start < 1) start = 1;
  if (end > totalPages) end = totalPages;
  //print out counter to the end
  let counter = start;
  while (counter <= end) {
    pageArr.push(counter);
    counter++;
  }
  return(
    <ul>
      {
        pageArr.map((i)=>{
          if (i===currentPage){
            return(<li className='current-page' onClick={()=>setCurrentPage(i)} key={uuidGen()}>{i}</li>);
          }else{
            return(<li className='page' onClick={()=>setCurrentPage(i)} key={uuidGen()}>{i}</li>);
          }
          
        })
      }
    </ul>
  )
}