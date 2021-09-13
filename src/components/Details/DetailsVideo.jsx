import React from 'react';
import { useSelector } from 'react-redux';

function DetailsVideo() {
  const yt = useSelector((state) => state.api.recipe.strYoutube);

  if (!yt) return null;

  const embedURL = `https://www.youtube.com/embed/${yt.split('=')[1]}`;

  return (
    <div className="details-video-container">
      <iframe
        title="recipe video"
        src={ embedURL }
        width="340"
        height="191.25"
        data-testid="video"
      >
        Recipe video
      </iframe>
    </div>
  );
}

export default DetailsVideo;
