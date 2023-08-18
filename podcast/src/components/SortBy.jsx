/*this component creates a dropdown menu that allows users to select a sorting order for items.
When the user selects an option, the onSort prop function is called with the selected sorting order.
This component provides a reusable way to incorporate sorting functionality into different parts of a React application.*/
import { useState } from 'react';
import PropTypes from 'prop-types';

const SortBy = ({ onSort }) => {
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    onSort(newSortOrder);
  };

  return (
    <div className='sort-order'>
      <label htmlFor="sortOrder">Sort by:</label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={handleSortChange}
      >
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
        <option value="date-asc">Date Ascending</option>
        <option value="date-desc">Date Descending</option>
      </select>
    </div>
  );
};

SortBy.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default SortBy;
