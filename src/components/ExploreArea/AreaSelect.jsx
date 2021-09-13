import React from 'react';
import PropTypes from 'prop-types';

function AreaSelect({ areas, setArea }) {
  return (
    <div className="explore-area-select">
      {!areas ? (
        <select name="areas" id="areas">
          <option value="">Carregando áreas</option>
        </select>
      ) : (
        <select
          name="areas"
          id="areas"
          data-testid="explore-by-area-dropdown"
          onChange={ (evt) => setArea(evt.target.value) }
        >
          <option value="All" data-testid="All-option">All</option>
          {areas.map(({ strArea }) => (
            <option key={ strArea } value={ strArea } data-testid={ `${strArea}-option` }>
              {strArea}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default AreaSelect;

AreaSelect.propTypes = {
  setArea: PropTypes.func.isRequired,
  areas: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.string,
  ]).isRequired,
};
