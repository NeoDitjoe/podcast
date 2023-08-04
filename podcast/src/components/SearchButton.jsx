import React from 'react';
import './SearchButton.css'; // Import the corresponding CSS file

const SearchButton = () => {
  return (
    <div className='SearchButton'>
      <input type="text" placeholder="Search" className='search-input' />
      <button className='search-button'>Search</button>
    </div>
  );
};

export default SearchButton;
