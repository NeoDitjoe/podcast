/* eslint-disable react/prop-types */

import '../App.css';

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