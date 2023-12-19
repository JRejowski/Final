import React from 'react';
import "../css/planComponent.css"

const PlanComponent = ({ name, creator}) => {
    return (
        <div className="plan">
            <h2>{name}</h2>
            <p>Creator: {creator}</p>
        </div>
    );
};

export default PlanComponent;

