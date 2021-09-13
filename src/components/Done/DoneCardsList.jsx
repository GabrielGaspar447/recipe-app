import React from 'react';
import PropTypes from 'prop-types';
import DoneCard from './DoneCard';

function DoneCardsList({ recsToShow }) {
  return (
    <div className="done-cards-container">
      {recsToShow.map((rec, idx) => (
        <DoneCard key={ rec.id } r={ rec } i={ idx } />
      ))}
    </div>
  );
}

export default DoneCardsList;

DoneCardsList.propTypes = {
  recsToShow: PropTypes.arrayOf(PropTypes.object).isRequired,
};
