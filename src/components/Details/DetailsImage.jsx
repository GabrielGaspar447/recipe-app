import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function DetailsImage({ spec }) {
  const thumb = useSelector((state) => state.api.recipe[`str${spec}Thumb`]);

  return (
    <div className="details-img-container">
      <img src={ thumb } alt="recipe" data-testid="recipe-photo" />
    </div>
  );
}

export default DetailsImage;

DetailsImage.propTypes = {
  spec: PropTypes.string.isRequired,
};
