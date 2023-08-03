// FilterBy.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const FilterBy = ({ onFilter }) => {
  const [filterValue, setFilterValue] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('title');

  const handleFilterChange = (event) => {
    const newFilterValue = event.target.value;
    setFilterValue(newFilterValue);
    onFilter(newFilterValue, filterCriteria);
  };

  const handleFilterCriteriaChange = (event) => {
    const newFilterCriteria = event.target.value;
    setFilterCriteria(newFilterCriteria);
    setFilterValue(''); // Reset filter value when changing criteria
    onFilter('', newFilterCriteria);
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

      <select
        id="filterCriteria"
        value={filterCriteria}
        onChange={handleFilterCriteriaChange}
      >
        <option value="title">Title</option>
        <option value="genre">Genre</option>
        <option value="type">Type</option>
      </select>
    </div>
  );
};

FilterBy.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterBy;
