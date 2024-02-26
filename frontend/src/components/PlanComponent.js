import React from 'react';
import { Link } from 'react-router-dom';
import "../css/planComponent.css";

const PlanComponent = ({ id, name, creator }) => {
    return (
        <div className="plan">
            <Link className="link-to-plan" to={`/plan/${id}`}>
                <h2>{name}</h2>
            </Link>
            <p className="plan-creator">Creator: {creator}</p>
        </div>
    );
};

export default PlanComponent;
