import React from 'react';
import "../css/planComponent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

const PlanComponent = ({ name, creator, likes, dislikes }) => {
    return (
        <div className="plan">
            <h2>{name}</h2>
            <p>Creator: {creator}</p>
            <div className="social">
                <p><FontAwesomeIcon className="social-icon" icon={faThumbsUp}/>{likes}</p>
                <p><FontAwesomeIcon className="social-icon" icon={faThumbsDown}/>{dislikes}</p>
            </div>
        </div>
    );
};

export default PlanComponent;

