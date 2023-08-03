// FilterBy.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';


const FilterBy = ({ onFilter }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    const newFilterValue = event.target.value;
    setFilterValue(newFilterValue);
    onFilter(newFilterValue);
  };

  return (
    <div className='filer-value'>
      <label htmlFor="filterValue">Filter by:</label>
      <input
        type="text"
        id="filterValue"
        value={filterValue}
        onChange={handleFilterChange}
      />
    </div>
  );
};
FilterBy.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
  
export default FilterBy;
