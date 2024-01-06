// Plans.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PlanComponent from '../components/PlanComponent';
import '../css/plans.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

function Plans() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        // Fetch plans from the API
        fetch('http://localhost:8080/api/plans')
            .then((response) => response.json())
            .then((data) => setPlans(data))
            .catch((error) => console.error('Error fetching plans:', error));
    }, []);

    return (
        <div className="base-container">
            <Navigation />
            <div className="content">
                <div className="top">
                    <h1>Plans</h1>
                    <div className="new-plan">
                        <h2>Create new plan</h2>
                        <FontAwesomeIcon icon={faClipboard} className="icon-clipboard" />
                    </div>
                </div>
                <section className="plans">
                    {plans && plans.length > 0 ? (
                        plans
                            .filter((plan) => plan.public)
                            .map((plan) => (
                                <PlanComponent
                                    key={plan.id}
                                    id={plan.id}  // Przekazuj id planu do komponentu PlanComponent
                                    name={plan.name}
                                    creator={plan.createdBy.login}
                                ></PlanComponent>
                            ))
                    ) : (
                        <p>No public plans available.</p>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Plans;
