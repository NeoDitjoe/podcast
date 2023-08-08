
import '../App.css';

const SearchButton = () => {
  return (
    <div className='SearchButton'>
      <input type="text" placeholder="Search" className='search-input' />
      <button className='search-button'>Search</button>
    </div>
  );
};

export default SearchButton;
