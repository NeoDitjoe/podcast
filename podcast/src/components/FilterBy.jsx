//Fuzzy option
import { useState } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

const FilterBy = ({ onFilter, showList }) => {
  const [filterValue, setFilterValue] = useState('');
  const [filteredShows, setFilteredShows] = useState([]);

  const handleFilterChange = (event) => {
    const newFilterValue = event.target.value;
    setFilterValue(newFilterValue);

    // Configure the fuzzy search options
    const options = {
      keys: ['title'], // Assuming your show objects have a "title" property, you can change this according to your data structure.
      includeScore: true,
      threshold: 0.4, // Adjust the threshold to control the fuzziness level (0 to 1)
    };

    // Create a new Fuse instance with the showList and search options
    const fuse = new Fuse(showList, options);

    // Perform the fuzzy search
    const filteredResults = fuse.search(newFilterValue);

    // Extract the filtered show titles from the search results
    const filteredShowTitles = filteredResults.map((result) => result.item.title);

    setFilteredShows(filteredShowTitles); // Save filtered results in state
    onFilter(filteredShowTitles);
  };

  return (
    <div className='filter-value'>
      <label htmlFor="filterValue">Filter by:</label>
      <input
        type="text"
        id="filterValue"
        value={filterValue}
        onChange={handleFilterChange}
      />
      {filteredShows.length === 0 && filterValue.trim() !== '' && <div>No results found </div>}
      {filteredShows.length > 0 && filteredShows.map((showTitle, index) => (
        <div key={index}>{showTitle}</div>
      ))}
    </div>
  );
};

FilterBy.propTypes = {
  onFilter: PropTypes.func.isRequired,
  showList: PropTypes.array.isRequired, // Assuming showList is an array of objects with titles
};

export default FilterBy;


// // FilterBy.jsx
// import { useState } from 'react';
// import PropTypes from 'prop-types';


// const FilterBy = ({ onFilter }) => {
//   const [filterValue, setFilterValue] = useState('');

//   const handleFilterChange = (event) => {
//     const newFilterValue = event.target.value;
//     setFilterValue(newFilterValue);
//     onFilter(newFilterValue);
//   };
  


//   return (
//     <div className='filer-value'>
//       <label htmlFor="filterValue">Filter by:</label>
//       <input
//         type="text"
//         id="filterValue"
//         value={filterValue}
//         onChange={handleFilterChange}
//       />
//     </div>
//   );
// };
// FilterBy.propTypes = {
//   onFilter: PropTypes.func.isRequired,
// };
  
// export default FilterBy;

// import { useState } from 'react';
// import PropTypes from 'prop-types';

// const FilterBy = ({ onFilter }) => {
//   const [filterValue, setFilterValue] = useState('');
//   const [filterCriteria, setFilterCriteria] = useState('title');

//   const handleFilterChange = (event) => {
//     const newFilterValue = event.target.value;
//     setFilterValue(newFilterValue);
//     onFilter(newFilterValue, filterCriteria);
//   };

//   const handleFilterCriteriaChange = (event) => {
//     const newFilterCriteria = event.target.value;
//     setFilterCriteria(newFilterCriteria);
//     setFilterValue(''); // Reset filter value when changing criteria
//     onFilter('', newFilterCriteria);
//   };

//   return (
//     <div className='filter-value'>
//       <label htmlFor="filterValue">Filter by:</label>
//       <input
//         type="text"
//         id="filterValue"
//         value={filterValue}
//         onChange={handleFilterChange}
//       />

//       <select
//         id="filterCriteria"
//         value={filterCriteria}
//         onChange={handleFilterCriteriaChange}
//       >
//         <option value="title">Title</option>
//         <option value="genre">Genre</option>
//         <option value="type">Type</option>
//       </select>
//     </div>
//   );
// };

// FilterBy.propTypes = {
//   onFilter: PropTypes.func.isRequired,
// };

// export default FilterBy;



// // FilterBy.jsx
// import { useState } from 'react';
// import PropTypes from 'prop-types';

// const FilterBy = ({ onFilter }) => {
//   const [filterValue, setFilterValue] = useState('');
//   const [filterCriteria, setFilterCriteria] = useState('title');

//   const handleFilterChange = (event) => {
//     const newFilterValue = event.target.value;
//     setFilterValue(newFilterValue);
//     onFilter(newFilterValue, filterCriteria);
//   };

//   const handleFilterCriteriaChange = (event) => {
//     const newFilterCriteria = event.target.value;
//     setFilterCriteria(newFilterCriteria);
//     setFilterValue(''); // Reset filter value when changing criteria
//     onFilter('', newFilterCriteria);
//   };

//   return (
//     <div className='filter-value'>
//       <label htmlFor="filterValue">Filter by:</label>
//       <input
//         type="text"
//         id="filterValue"
//         value={filterValue}
//         onChange={handleFilterChange}
//       />

//       <select
//         id="filterCriteria"
//         value={filterCriteria}
//         onChange={handleFilterCriteriaChange}
//       >
//         <option value="title">Title</option>
//         <option value="genre">Genre</option>
//         <option value="type">Type</option>
//       </select>
//     </div>
//   );
// };

// FilterBy.propTypes = {
//   onFilter: PropTypes.func.isRequired,
// };

// export default FilterBy;
