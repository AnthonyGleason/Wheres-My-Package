import './PackageSearchBar.css';
import loadingImg from '../../assets/loading.svg';
import { ResultBrowser } from '../../classes/ResultBrowser';

export default function PackageSearchBar({resultBrowser}:{resultBrowser:ResultBrowser}){
  const handleSearchEvent = async function(){
    resultBrowser.lockSearch();
    await resultBrowser.searchQuery
      .getResults()
      .then(()=>{resultBrowser.unlockSearch()});
  };

  return(
    <section className='package-search'>
      <h3 className='search-title'>Package Search</h3>
      <form className='search-field'>
        <div className='search-arch'>
          <label>Architecture</label>
          <select value={resultBrowser.archInput} onChange={(e)=>{resultBrowser.setInput('arch',e.target.value.toLowerCase())}}>
            <option>Any</option>
            <option>x86_64</option>
          </select>
        </div>
        <div className='search-repo'>
          <label>Repository</label>
          <select value={resultBrowser.repoInput} onChange={(e)=>{resultBrowser.setInput('repo',e.target.value.toLowerCase())}}>
            <option>Any</option>
            <option>Community</option>
            <option>Community-Testing</option>
            <option>Core</option>
            <option>Extra</option>
            <option>Aur</option>
            <option>KDE-Unstable</option>
            <option>Multilib</option>
            <option>Multilib-testing</option>
            <option>Testing</option>
          </select>
        </div>
        <div className='search-terms'>
          <label>Search Terms</label>
          <input value={resultBrowser.searchInput} onChange={(e)=>{resultBrowser.setInput('search',e.target.value)}} onKeyDown={(e) => {
              if (e.key==='Enter'){
                e.preventDefault();
                handleSearchEvent();
              }
            }}
          />
        </div>
        <button type='button' style={{color: resultBrowser.getButtonTextColor()}} className='search-button' onClick={()=>{handleSearchEvent()}}>Search</button>
        <button type='button' style={{color: resultBrowser.getButtonTextColor()}} className='lucky-button' onClick={()=>{handleSearchEvent()}}>I'm Feeling Lucky</button>
        <img className='loading' style={{display: resultBrowser.getLoadingImgStyle()}} src={loadingImg} alt='spinning circle indicating loading' />
      </form>
    </section>
  )
};