import React from 'react';
import PropTypes from 'prop-types';

function Categories({ catList, setCat }) {
  if (!catList.length) return null;
  return (
    <div className="categories-container">
      <select
        name="categories"
        id="categories"
        onChange={ (e) => setCat(e.target.value) }
      >
        <option value="All">All</option>
        {catList.map(({ strCategory }) => (
          <option
            key={ strCategory }
            value={ strCategory }
          >
            {strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Categories;

Categories.propTypes = {
  catList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCat: PropTypes.func.isRequired,
};
