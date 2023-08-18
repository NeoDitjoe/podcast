/* eslint-disable react/prop-types */
/*This SearchBar component provides a basic search input field and button, allowing users to search for 
content by typing a search term and clicking the "Search" button. It utilizes React's state management to
handle the user input and search action. */
import '../App.css';
import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

 const handleSearch = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    onSearch(searchTerm);
  };
  return (
    
    <>
    <div className="search-bar">
      <input className='searchInput'
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    
    </div>
    
</>

  );
  
}
export default SearchBar;




// const SearchBar = () => {
//   return (
//     <div className='SearchButton'>
//       <input type="text" placeholder="Search" className='search-input' />
//       <button className='search-button'>Search</button>
      
//     </div>
//   );
// };

// export default SearchBar;
{/* <FilterBy items={preview} onFilter={handleFilter} /> */}