import React from 'react';
import { useSelector } from 'react-redux';

function InProgressInstructions() {
  const instructions = useSelector((state) => state.api.recipe.strInstructions);

  if (!instructions) return null;

  const instrucArray = instructions.split('\r\n');
  instrucArray.forEach((p, i) => { if (!p.endsWith('.')) instrucArray[i] = `${p}.`; });
  return (
    <div className="InProgress-instructions-container">
      <h3>Instructions</h3>
      <div className="InProgress-intructions">
        {instrucArray.map((p, idx) => (
          <p key={ `${p[0]}${idx}` } data-testid="instructions">{p}</p>
        ))}
      </div>
    </div>
  );
}

export default InProgressInstructions;
