import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function InProgressImage({ spec }) {
  const thumb = useSelector((state) => state.api.recipe[`str${spec}Thumb`]);

  return (
    <div className="InProgress-img-container">
      <img src={ thumb } alt="recipe" data-testid="recipe-photo" />
    </div>
  );
}

export default InProgressImage;

InProgressImage.propTypes = {
  spec: PropTypes.string.isRequired,
};
