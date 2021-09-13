import React from 'react';
import PropTypes from 'prop-types';
import FavoriteCard from './FavoriteCard';

function FavoriteCardsList({ recsToShow }) {
  return (
    <div className="done-cards-container">
      {recsToShow.map((rec, idx) => (
        <FavoriteCard key={ rec.id } r={ rec } i={ idx } />
      ))}
    </div>
  );
}

export default FavoriteCardsList;

FavoriteCardsList.propTypes = {
  recsToShow: PropTypes.arrayOf(PropTypes.object).isRequired,
};
